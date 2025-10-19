import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
# from handlers.incoming_call import incoming_call_handler
from handlers.outgoing_call import outgoing_call_handler
from handlers.image_generation import image_generation_router

load_dotenv()

app = FastAPI(
    title="Lead Call API",
    description="FastAPI service for handling incoming and outgoing calls with OpenAI Realtime API and Image Generation",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:8001",
        "https://call.leadcall.uz",
        "https://leadcall.uz",
        "http://leadcall.uz",
        "https//app.leadcall.uz",
        "https://api.leadcall.uz",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for result images
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
# app.include_router(incoming_call_handler)
app.include_router(outgoing_call_handler)
app.include_router(image_generation_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
