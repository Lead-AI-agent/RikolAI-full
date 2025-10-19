import os
import base64
from typing import Optional, List
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Request
from fastapi.responses import JSONResponse, FileResponse, Response
from pydantic import BaseModel
from google import genai
from google.genai import types
from datetime import datetime
import uuid

# Configuration
GOOGLE_GEMINI_API_KEY = os.getenv('GOOGLE_GEMINI_API_KEY')

# Router
image_generation_router = APIRouter(
    prefix="/api/v1/image",
    tags=["image_generation"],
)

# Pydantic Models
class VirtualTryOnResponse(BaseModel):
    id: str
    status: str
    message: str
    result_image_url: Optional[str] = None
    created_at: datetime

class VirtualTryOnListResponse(BaseModel):
    message: str
    data: List[VirtualTryOnResponse]
    total: int

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    code: int

# In-memory storage (replace with database in production)
virtual_tryons_db = {}

class VirtualTryOnSystem:
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or GOOGLE_GEMINI_API_KEY
        if not self.api_key:
            raise ValueError("Google Gemini API key is required")
        
        # Initialize the Gemini client
        self.client = genai.Client(api_key=self.api_key)
    
    def _get_mime_type(self, filename: str) -> str:
        """Get MIME type of image from filename"""
        ext = os.path.splitext(filename)[1].lower()
        
        mime_types = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp'
        }
        return mime_types.get(ext, 'image/jpeg')
    
    async def process_tryon(
    self, 
    model_image_bytes: bytes, 
    clothing_image_bytes: bytes,
    model_filename: str,
    clothing_filename: str,
    output_path: Optional[str] = None
):
        try:
            # Prepare the prompt
            prompt = """
            Please create a virtual try-on image where the person in the first image is wearing the clothing item from the second image.
            Make it look realistic and natural. The clothing should fit the person's body shape and size appropriately.
            Return the result as a high-quality image.
            """
            
            # Create the request using the client
            response = self.client.models.generate_content(
                model='gemini-2.5-flash-image-preview',
                contents=[
                    types.Part.from_bytes(
                        data=model_image_bytes, 
                        mime_type=self._get_mime_type(model_filename)
                    ),
                    types.Part(text="This is the person/model image."),
                    types.Part.from_bytes(
                        data=clothing_image_bytes, 
                        mime_type=self._get_mime_type(clothing_filename)
                    ),
                    types.Part(text="This is the clothing item image."),
                    types.Part(text=prompt)
                ],
                config=types.GenerateContentConfig(
                    temperature=0.4,
                    top_p=1.0,
                    top_k=32,
                    max_output_tokens=4096,
                )
            )
            
            # Extract the generated image
            if response.candidates and len(response.candidates) > 0:
                candidate = response.candidates[0]
                if candidate.content and candidate.content.parts:
                    for part in candidate.content.parts:
                        if hasattr(part, 'inline_data') and part.inline_data:
                            # The inline_data.data is already base64-encoded string
                            image_data = part.inline_data.data
                            
                            # Check if it's a string or bytes
                            if isinstance(image_data, str):
                                # It's a base64 string, decode it
                                image_bytes = base64.b64decode(image_data)
                            else:
                                # It's already bytes
                                image_bytes = image_data
                            
                            if output_path:
                                # Save to specified path
                                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                                with open(output_path, 'wb') as f:
                                    f.write(image_bytes)
                                return {
                                    'success': True,
                                    'message': 'Virtual try-on completed successfully',
                                    'image_path': output_path,
                                    'image_data': image_bytes
                                }
                            else:
                                # Return image data
                                return {
                                    'success': True,
                                    'message': 'Virtual try-on completed successfully',
                                    'image_data': image_bytes
                                }
            
            return {
                'success': False,
                'message': 'No image generated from API response',
                'response': str(response)
            }
            
        except Exception as e:
            return {
                'success': False,
                'message': f'Processing failed: {str(e)}',
                'error': str(e)
            }


# Helper function to get try-on system
def get_tryon_system():
    return VirtualTryOnSystem()


@image_generation_router.post("/virtual-tryon", response_model=VirtualTryOnResponse)
async def create_virtual_tryon(
    model_image: UploadFile = File(..., description="Image of the person/model"),
    clothing_image: UploadFile = File(..., description="Image of the clothing item"),
    tryon_system: VirtualTryOnSystem = Depends(get_tryon_system),
    request: Request = None
):
    """
    Process virtual try-on
    
    Accepts two images (model/person and clothing) and returns the result
    """
    try:
        # Validate file types
        allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        
        if model_image.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid model image type. Allowed types: {', '.join(allowed_types)}"
            )
        
        if clothing_image.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid clothing image type. Allowed types: {', '.join(allowed_types)}"
            )
        
        # Generate unique ID for this try-on
        tryon_id = str(uuid.uuid4())
        
        # Create directory for storing results
        results_dir = "static/results"
        os.makedirs(results_dir, exist_ok=True)
        
        # Get base URL from request
        base_url = f"{request.url.scheme}://{request.url.hostname}"
        if request.url.port and request.url.port not in [80, 443]:
            base_url += f":{request.url.port}"
        
        # Store initial record
        virtual_tryons_db[tryon_id] = {
            'id': tryon_id,
            'status': 'processing',
            'message': 'Processing virtual try-on...',
            'result_image_url': None,
            'created_at': datetime.now(),
            'error_message': None
        }
        
        # Read image bytes
        model_image_bytes = await model_image.read()
        clothing_image_bytes = await clothing_image.read()
        
        # Process the try-on
        result = await tryon_system.process_tryon(
            model_image_bytes=model_image_bytes,
            clothing_image_bytes=clothing_image_bytes,
            model_filename=model_image.filename,
            clothing_filename=clothing_image.filename,
            output_path=f"{results_dir}/result_{tryon_id}.png"
        )
        
        if result.get('success'):
            # Update record with success and full URL
            full_image_url = f"{base_url}/api/v1/image/result/{tryon_id}"
            virtual_tryons_db[tryon_id].update({
                'status': 'completed',
                'message': 'Virtual try-on completed successfully',
                'result_image_url': full_image_url,
            })
            
            return VirtualTryOnResponse(**virtual_tryons_db[tryon_id])
        else:
            # Update record with failure
            error_message = result.get('message', 'Unknown error')
            virtual_tryons_db[tryon_id].update({
                'status': 'failed',
                'message': error_message,
                'error_message': error_message
            })
            
            raise HTTPException(
                status_code=500,
                detail=f"Virtual try-on failed: {error_message}"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        # Update record with error if it exists
        if tryon_id in virtual_tryons_db:
            virtual_tryons_db[tryon_id].update({
                'status': 'failed',
                'message': f"Request error: {str(e)}",
                'error_message': str(e)
            })
        
        raise HTTPException(
            status_code=400,
            detail=f"Request error: {str(e)}"
        )


@image_generation_router.get("/virtual-tryon", response_model=VirtualTryOnListResponse)
async def get_all_virtual_tryons(request: Request):
    """
    Get all virtual try-ons
    """
    try:
        # Get base URL from request
        base_url = f"{request.url.scheme}://{request.url.hostname}"
        if request.url.port and request.url.port not in [80, 443]:
            base_url += f":{request.url.port}"
        
        # Update all URLs to be full URLs
        tryons = []
        for tryon in virtual_tryons_db.values():
            tryon_copy = tryon.copy()
            if tryon_copy['result_image_url'] and tryon_copy['result_image_url'].startswith('/'):
                tryon_copy['result_image_url'] = f"{base_url}{tryon_copy['result_image_url']}"
            tryons.append(tryon_copy)
        
        return VirtualTryOnListResponse(
            message="Virtual try-ons retrieved successfully",
            data=tryons,
            total=len(tryons)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving try-ons: {str(e)}"
        )


@image_generation_router.get("/virtual-tryon/{tryon_id}", response_model=VirtualTryOnResponse)
async def get_virtual_tryon(tryon_id: str, request: Request):
    """
    Get details of a specific virtual try-on
    """
    try:
        if tryon_id not in virtual_tryons_db:
            raise HTTPException(
                status_code=404,
                detail="Virtual try-on not found"
            )
        
        # Get base URL from request
        base_url = f"{request.url.scheme}://{request.url.hostname}"
        if request.url.port and request.url.port not in [80, 443]:
            base_url += f":{request.url.port}"
        
        # Update URL to be full URL
        tryon = virtual_tryons_db[tryon_id].copy()
        if tryon['result_image_url'] and tryon['result_image_url'].startswith('/'):
            tryon['result_image_url'] = f"{base_url}{tryon['result_image_url']}"
        
        return VirtualTryOnResponse(**tryon)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error: {str(e)}"
        )


@image_generation_router.get("/result/{tryon_id}")
async def get_result_image(tryon_id: str):
    """
    Get the result image for a specific virtual try-on
    Displays the image in the browser instead of downloading
    """
    try:
        if tryon_id not in virtual_tryons_db:
            raise HTTPException(
                status_code=404,
                detail="Virtual try-on not found"
            )
        
        tryon = virtual_tryons_db[tryon_id]
        
        if tryon['status'] != 'completed':
            raise HTTPException(
                status_code=400,
                detail=f"Try-on is not completed. Current status: {tryon['status']}"
            )
        
        image_path = f"static/results/result_{tryon_id}.png"
        
        if not os.path.exists(image_path):
            raise HTTPException(
                status_code=404,
                detail="Result image not found"
            )
        
        # Return Response with inline disposition to display in browser
        with open(image_path, 'rb') as f:
            image_bytes = f.read()
        
        return Response(
            content=image_bytes,
            media_type="image/png",
            headers={
                "Content-Disposition": f"inline; filename=result_{tryon_id}.png"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error: {str(e)}"
        )


@image_generation_router.delete("/virtual-tryon/{tryon_id}")
async def delete_virtual_tryon(tryon_id: str):
    """
    Delete a specific virtual try-on
    """
    try:
        if tryon_id not in virtual_tryons_db:
            raise HTTPException(
                status_code=404,
                detail="Virtual try-on not found"
            )
        
        # Delete the result image if it exists
        image_path = f"static/results/result_{tryon_id}.png"
        if os.path.exists(image_path):
            os.remove(image_path)
        
        # Remove from database
        del virtual_tryons_db[tryon_id]
        
        return {
            "success": True,
            "message": "Virtual try-on deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error: {str(e)}"
        )

