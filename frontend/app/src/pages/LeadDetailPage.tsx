import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MessageSquare, Send, X } from "lucide-react"
import type { Customer } from "@/lib/mock-data"
import { generateMockCustomers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock clothing items
const mockClothingItems = [
  {
    id: 1,
    name: "Summer Dress Blue",
    image: "/dress-blue.png",
    price: "$89",
    color: "Blue",
    category: "Dresses",
  },
  {
    id: 2,
    name: "Black Leather Jacket",
    image: "/black-leather-jacked.png",
    price: "$199",
    color: "Black",
    category: "Jackets",
  },
  {
    id: 3,
    name: "White T-Shirt",
    image: "/white-t-shirt.png",
    price: "$29",
    color: "White",
    category: "Tops",
  },
  {
    id: 4,
    name: "Denim Jeans",
    image: "/denim-jeans.png",
    price: "$79",
    color: "Blue",
    category: "Bottoms",
  },
  {
    id: 5,
    name: "Floral Blouse",
    image: "/clothe1.png",
    price: "$69",
    color: "Multicolor",
    category: "Tops",
  },
  {
    id: 6,
    name: "Casual Sweater",
    image: "/clothe2.png",
    price: "$59",
    color: "Beige",
    category: "Sweaters",
  },
]

// Mock user models
const mockUserModels = [
  {
    id: 1,
    name: "User 1",
    image: "/user1.png",
  },

]

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [selectedClothing, setSelectedClothing] = useState<any>(null)
  const [userImage, setUserImage] = useState<string | null>(null)
  const [tryOnImage, setTryOnImage] = useState<string | null>(null)
  const [showTryOn, setShowTryOn] = useState(false)
  const [messageInput, setMessageInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatMessages, setChatMessages] = useState<any[]>([])

  useEffect(() => {
    const customers = generateMockCustomers()
    const foundCustomer = customers.find(c => c.id === id)
    if (foundCustomer) {
      setCustomer(foundCustomer)
      // Initialize chat with customer's messages plus demo try-on images
      const initialMessages = [
        ...foundCustomer.messages.slice(0, 3),
        {
          id: `msg-demo-1`,
          role: "ai" as const,
          text: "Here's an example of our Virtual Try-On feature! 👕",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          platform: "Chat" as const,
        },
        {
          id: `msg-demo-2`,
          role: "ai" as const,
          text: "This is the clothing item selected:",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          platform: "Chat" as const,
          image: "/chat.png",
        },
        {
          id: `msg-demo-3`,
          role: "ai" as const,
          text: "And here's the final result - how it looks on you! ✨",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          platform: "Chat" as const,
          image: "/chat-final.png",
        },
      ]
      setChatMessages(initialMessages)
    }
  }, [id])

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages, isTyping])

  const handleTryOn = () => {
    if (userImage && selectedClothing) {
      setTryOnImage(`✨ AI Generated Try-On: ${selectedClothing.name} on user ✨`)
      setShowTryOn(true)
    }
  }

  const handleSendToChat = () => {
    if (tryOnImage) {
      // Add try-on image to chat
      const newMessage = {
        id: `msg-${Date.now()}`,
        role: "ai" as const,
        text: `Check out this virtual try-on of the ${selectedClothing?.name}! 👗✨`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        platform: "Chat" as const,
        image: tryOnImage,
      }
      setChatMessages([...chatMessages, newMessage])
      setShowTryOn(false)
      setUserImage(null)
      setSelectedClothing(null)
      setTryOnImage(null)
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      role: "user" as const,
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      platform: "Chat" as const,
    }

    setChatMessages([...chatMessages, userMessage])
    setMessageInput("")

    // Simulate AI response with typing indicator
    setIsTyping(true)
    setTimeout(() => {
      const aiResponses = [
        "That looks great on you! 👗 Would you like to try other styles?",
        "Love it! This piece matches your style perfectly ✨",
        "You should definitely get this! It's perfect for your collection 💯",
        "This would look amazing! Ready to purchase?",
        "Great choice! Want to see similar items?",
      ]
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      const aiMessage = {
        id: `msg-${Date.now()}`,
        role: "ai" as const,
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        platform: "Chat" as const,
      }
      setChatMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Customer Not Found</h1>
          <Button onClick={() => navigate(-1)} variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">{customer.name}</h1>
            <p className="text-xs text-gray-400">{customer.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 mt-32 mx-auto  flex">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full h-fit">

          {/* Chat Section - Left Side, Fixed Full Height */}
          <div className="lg:col-span-1 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6 flex flex-col h-[calc(100vh-140px)] overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Chat
            </h3>

            {/* Messages Area */}
            <div className="flex-1 space-y-3 overflow-y-auto mb-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-400">Start a conversation...</p>
                </div>
              ) : (
                <>
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${msg.role === "user"
                          ? "bg-cyan-600 text-white rounded-br-none"
                          : "bg-indigo-600 text-white rounded-bl-none"
                          }`}
                      >
                        <p className="mb-1">{msg.text}</p>
                        {msg.image && (
                          <img src={msg.image} alt="Chat image" className="w-full rounded mt-2 mb-2 max-h-64 object-cover" />
                        )}
                        <p className="text-xs opacity-70">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-indigo-600 text-white rounded-lg rounded-bl-none px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type message..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim() || isTyping}
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
                >
                  <Send size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-400">Try-on images will appear here</p>
            </div>
          </div>

          {/* Virtual Try-On Section - Right Side, Scrollable */}
          <div className="lg:col-span-2 overflow-y-auto h-[calc(100vh-140px)] space-y-6 pr-4">
            {/* Clothing Gallery */}
            <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Virtual Try-On Gallery</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {mockClothingItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedClothing(item)}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedClothing?.id === item.id
                        ? "border-cyan-500 bg-cyan-500/20"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-48 object-contain rounded mb-4" />
                    <p className="text-sm font-medium text-white mb-1">{item.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{item.color}</p>
                    <p className="text-sm font-bold text-cyan-400">{item.price}</p>
                  </button>
                ))}
              </div>

              {selectedClothing && (
                <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 mb-6">
                  <p className="text-sm text-white">
                    ✓ Selected: <span className="font-bold">{selectedClothing.name}</span>
                  </p>
                </div>
              )}

              {/* User Image Selection */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">Select a User Model:</p>
                <div className="grid grid-cols-3 gap-3">
                  {mockUserModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setUserImage(model.image)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all ${userImage === model.image
                        ? "border-cyan-500 shadow-lg shadow-cyan-500/50"
                        : "border-white/10 hover:border-white/30"
                        }`}
                    >
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-80 object-contain"
                      />
                      <div className={`absolute inset-0 flex items-end justify-center pb-2 ${userImage === model.image
                        ? "bg-cyan-500/20"
                        : "bg-black/40"
                        }`}>
                        <p className="text-xs font-medium text-white">{model.name}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {userImage && (
                  <div className="space-y-3">
                    <div className="relative rounded-lg overflow-hidden bg-white/5 border border-white/10 p-4">
                      <img src={userImage} alt="User" className="w-full h-48 object-cover rounded" />
                      <button
                        onClick={() => setUserImage(null)}
                        className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded text-white"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-green-400">✓ Model selected successfully</p>
                  </div>
                )}

                {/* Try-On Button */}
                <Button
                  onClick={handleTryOn}
                  disabled={!userImage || !selectedClothing || showTryOn}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white disabled:opacity-50"
                >
                  Generate Virtual Try-On
                </Button>
              </div>
            </div>

            {/* AI Try-On Preview */}
            {showTryOn && tryOnImage && (
              <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-green-500/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">✨ AI Try-On Preview</h3>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-4 text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-white font-medium mb-2">{selectedClothing?.name}</p>
                  <p className="text-sm text-gray-300 mb-4">{tryOnImage}</p>
                  <p className="text-xs text-gray-400">(Mock AI Generated Image)</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSendToChat}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send to Chat
                  </Button>
                  <Button
                    onClick={() => setShowTryOn(false)}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Try Another
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
