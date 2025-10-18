import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ArrowLeft, CheckCircle, MessageCircle } from "lucide-react"
import type { Customer } from "@/lib/mock-data"
import { generateMockCustomers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { PhoneMockup } from "@/components/phone-mockup"

interface SimulationStep {
  id: string
  message: string
  timestamp: number
  type: "analyzing" | "choosing" | "connecting" | "sent" | "response" | "marked"
}

interface ConversationMessage {
  role: "ai" | "user"
  text: string
  timestamp: number
}

export default function SimulationPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [allLeads, setAllLeads] = useState<Customer[]>(generateMockCustomers())
  const [selectedLeads, setSelectedLeads] = useState<Customer[]>([])
  const [steps, setSteps] = useState<SimulationStep[]>([])
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [showPhoneMockup, setShowPhoneMockup] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [callTranscription, setCallTranscription] = useState<string[]>([])
  const [currentSpeaker, setCurrentSpeaker] = useState<'ai' | 'user' | null>(null)

  const aiMessages = [
    "Hi! 👋 I noticed you loved our recent collection! We just got some amazing new arrivals that I think you'd love!",
    "We've helped similar customers find their perfect style. Are you open to seeing some personalized recommendations?",
    "No pressure at all! Feel free to reach out whenever you're ready. We're here to help!",
    "I'd love to send you a personalized outfit preview. What works better for you?",
    "Perfect! I'll create some custom looks for you based on your style!",
    "Great question! Our new collection includes advanced virtual try-on technology!",
  ]

  const userResponses = [
    "Hey! Thanks for reaching out. I'm definitely interested in new styles!",
    "That sounds great! When can you show me what's new?",
    "This looks promising. Let me check my calendar and get back to you.",
    "What about sizing? I usually wear medium.",
    "Can I see how these items would look on me first?",
    "Do you have any special offers or discounts?",
    "Perfect! My email is on file.",
    "That's exactly what I've been looking for!",
  ]

  const callTranscriptions = {
    ai: [
      "Hello, this is Sarah from our sales team. I'm calling about the CRM solution you showed interest in.",
      "I understand you're looking for an enterprise solution. Let me tell you about our advanced features.",
      "Our enterprise plan includes unlimited contacts, advanced automation, and 24/7 priority support.",
      "For your team size, we can offer a special enterprise package at $99 per user per month.",
      "I can set up a personalized demo for you this week. Are you available tomorrow at 2 PM?",
    ],
    user: [
      "Hi Sarah, yes I remember looking at your website. We're definitely interested.",
      "That sounds comprehensive. What about integration with our existing tools?",
      "The pricing seems reasonable. Do you have any implementation support?",
      "Tomorrow at 2 PM works perfectly. Can you send me a calendar invite?",
      "Great! I'll have my team ready for the demo. Looking forward to it.",
    ]
  }

  useEffect(() => {
    // Get selected lead IDs from URL params
    const leadIds = searchParams.get('leads')?.split(',') || []
    if (leadIds.length > 0) {
      const leads = allLeads.filter(lead => leadIds.includes(lead.id))
      setSelectedLeads(leads)
    }
  }, [searchParams, allLeads])

  useEffect(() => {
    if (selectedLeads.length > 0 && !isRunning && !isComplete) {
      startSimulation()
    }
  }, [selectedLeads])

  const handlePhoneCall = async (lead: Customer, newSteps: SimulationStep[], stepId: number) => {
    setIsCallActive(true)
    setCallTranscription([])
    
    // Call connected
    await new Promise((resolve) => setTimeout(resolve, 2000))
    newSteps.push({
      id: `${stepId++}`,
      message: `Call connected with ${lead.name} 📞`,
      timestamp: Date.now(),
      type: "sent",
    })
    setSteps([...newSteps])

    // Simulate voice-to-text transcription
    const aiPhrases = callTranscriptions.ai
    const userPhrases = callTranscriptions.user

    for (let i = 0; i < Math.min(aiPhrases.length, userPhrases.length); i++) {
      // AI speaks
      setCurrentSpeaker('ai')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Simulate real-time transcription
      const aiText = aiPhrases[i]
      let transcribedText = ""
      for (let j = 0; j < aiText.length; j++) {
        transcribedText += aiText[j]
        setCallTranscription(prev => [...prev.slice(0, -1), `AI: ${transcribedText}`])
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // User responds
      setCurrentSpeaker('user')
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      const userText = userPhrases[i]
      let userTranscribedText = ""
      for (let j = 0; j < userText.length; j++) {
        userTranscribedText += userText[j]
        setCallTranscription(prev => [...prev.slice(0, -1), `User: ${userTranscribedText}`])
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setCurrentSpeaker(null)
    }

    // Call ended
    await new Promise((resolve) => setTimeout(resolve, 1000))
    newSteps.push({
      id: `${stepId++}`,
      message: `Call completed successfully ✅`,
      timestamp: Date.now(),
      type: "response",
    })
    setSteps([...newSteps])
    setIsCallActive(false)
  }

  const handleMessaging = async (_lead: Customer, newSteps: SimulationStep[], stepId: number) => {
    // AI sends message
    await new Promise((resolve) => setTimeout(resolve, 1200))
    const aiMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)]
    setConversation((prev) => [...prev, { role: "ai", text: aiMessage, timestamp: Date.now() }])
    newSteps.push({
      id: `${stepId++}`,
      message: `Message sent ✅`,
      timestamp: Date.now(),
      type: "sent",
    })
    setSteps([...newSteps])

    // Wait for response (varying timing to simulate real typing)
    const responseDelay = 2000 + Math.random() * 4000 // 2-6 seconds
    await new Promise((resolve) => setTimeout(resolve, responseDelay))
    const userResponse = userResponses[Math.floor(Math.random() * userResponses.length)]
    setConversation((prev) => [...prev, { role: "user", text: userResponse, timestamp: Date.now() }])
    newSteps.push({
      id: `${stepId++}`,
      message: `Lead responded: 👍 ${userResponse}`,
      timestamp: Date.now(),
      type: "response",
    })
    setSteps([...newSteps])

    // Sometimes add a follow-up message for more realistic conversation
    if (Math.random() > 0.4) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const followUpMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)]
      setConversation((prev) => [...prev, { role: "ai", text: followUpMessage, timestamp: Date.now() }])
      newSteps.push({
        id: `${stepId++}`,
        message: `Follow-up message sent ✅`,
        timestamp: Date.now(),
        type: "sent",
      })
      setSteps([...newSteps])

      // Final user response
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 2000))
      const finalResponse = userResponses[Math.floor(Math.random() * userResponses.length)]
      setConversation((prev) => [...prev, { role: "user", text: finalResponse, timestamp: Date.now() }])
      newSteps.push({
        id: `${stepId++}`,
        message: `Lead responded: 👍 ${finalResponse}`,
        timestamp: Date.now(),
        type: "response",
      })
      setSteps([...newSteps])
    }
  }

  const startSimulation = async () => {
    if (selectedLeads.length === 0) return
    
    setIsRunning(true)
    setSteps([])
    setProgress(0)
    setIsComplete(false)
    
    const newSteps: SimulationStep[] = []
    let stepId = 0
    let updatedLeads = [...allLeads]

    for (let i = 0; i < selectedLeads.length; i++) {
      const lead = selectedLeads[i]
      setCurrentLeadIndex(i)
      setConversation([])
      
      // Show phone mockup for first lead and keep it open
      if (i === 0) {
        setShowPhoneMockup(true)
      }

      // Analyzing
      await new Promise((resolve) => setTimeout(resolve, 800))
      newSteps.push({
        id: `${stepId++}`,
        message: `Analyzing lead profile for ${lead.name}…`,
        timestamp: Date.now(),
        type: "analyzing",
      })
      setSteps([...newSteps])

      // Choosing channel
      await new Promise((resolve) => setTimeout(resolve, 1200))
      newSteps.push({
        id: `${stepId++}`,
        message: `Choosing best channel (${lead.source})...`,
        timestamp: Date.now(),
        type: "choosing",
      })
      setSteps([...newSteps])

      // Connecting
      await new Promise((resolve) => setTimeout(resolve, 1000))
      newSteps.push({
        id: `${stepId++}`,
        message: lead.source === "Phone" ? `Initiating call to ${lead.name}...` : `Connecting to lead…`,
        timestamp: Date.now(),
        type: "connecting",
      })
      setSteps([...newSteps])

      // Handle phone calls vs messaging
      if (lead.source === "Phone") {
        await handlePhoneCall(lead, newSteps, stepId)
      } else {
        await handleMessaging(lead, newSteps, stepId)
      }

      // Marked as contacted
      await new Promise((resolve) => setTimeout(resolve, 800))
      newSteps.push({
        id: `${stepId++}`,
        message: `AI marked as Engaged.`,
        timestamp: Date.now(),
        type: "marked",
      })
      setSteps([...newSteps])

      // Update lead status
      updatedLeads = updatedLeads.map((l) => (l.id === lead.id ? { ...l, status: "Engaged" as const } : l))

      setProgress(Math.round(((i + 1) / selectedLeads.length) * 100))
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    setAllLeads(updatedLeads)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsComplete(true)
    setIsRunning(false)
  }

  const handleComplete = () => {
    navigate('/')
  }

  if (selectedLeads.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Leads Selected</h1>
          <Button onClick={() => navigate('/')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-40">
        <div className="px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <h1 className="text-xl font-bold text-white">AI Campaign Simulation</h1>
              <p className="text-xs text-gray-400">
                Processing {selectedLeads.length} lead{selectedLeads.length !== 1 ? "s" : ""}...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Overall Progress</span>
                  <span className="text-sm font-bold text-blue-400">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {steps.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <div className="inline-block">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Initializing AI campaign...</p>
                    </div>
                  </div>
                ) : (
                  steps.map((step) => (
                    <div key={step.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex-shrink-0 mt-1">
                        {step.type === "sent" || step.type === "marked" ? (
                          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle size={16} className="text-green-400" />
                          </div>
                        ) : step.type === "response" ? (
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <MessageCircle size={16} className="text-blue-400" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-200">{step.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(step.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="lg:col-span-1">
            {showPhoneMockup && selectedLeads[currentLeadIndex] && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">
                  Current Lead: {selectedLeads[currentLeadIndex].name}
                </h3>
                {selectedLeads[currentLeadIndex].source === "Phone" && isCallActive ? (
                  <CallInterface 
                    leadName={selectedLeads[currentLeadIndex].name}
                    transcription={callTranscription}
                    currentSpeaker={currentSpeaker}
                  />
                ) : (
                  <PhoneMockup 
                    leadName={selectedLeads[currentLeadIndex].name} 
                    messages={conversation} 
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          {isComplete ? (
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 max-w-md mx-auto">
                <p className="text-green-200 font-medium text-center">
                  ✅ AI Campaign Completed — {selectedLeads.length} lead{selectedLeads.length !== 1 ? "s" : ""}{" "}
                  contacted successfully.
                </p>
              </div>
              <Button
                onClick={handleComplete}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all"
              >
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-400">
                {isRunning ? `Processing lead ${currentLeadIndex + 1} of ${selectedLeads.length}...` : 'Preparing simulation...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Call Interface Component
function CallInterface({ 
  leadName, 
  transcription, 
  currentSpeaker 
}: { 
  leadName: string
  transcription: string[]
  currentSpeaker: 'ai' | 'user' | null
}) {
  return (
    <div className="w-80 flex-shrink-0">
      {/* Phone Frame */}
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl border-8 border-gray-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="h-6 bg-black flex items-center justify-center">
          <div className="w-32 h-5 bg-black rounded-b-2xl" />
        </div>

        {/* Screen */}
        <div className="bg-gradient-to-b from-green-900 to-green-950 h-96 flex flex-col">
          {/* Call Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-lg">📞</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{leadName}</p>
              <p className="text-green-200 text-xs">
                {currentSpeaker ? (currentSpeaker === 'ai' ? 'AI Speaking...' : 'User Speaking...') : 'Call Active'}
              </p>
            </div>
          </div>

          {/* Transcription */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-green-900 to-green-950">
            {transcription.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-green-300 text-xs">Connecting call...</p>
                </div>
              </div>
            ) : (
              transcription.map((line, idx) => (
                <div
                  key={idx}
                  className={`flex ${line.startsWith('AI:') ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-xs ${
                      line.startsWith('AI:')
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-white/20 text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="font-semibold text-xs mb-1">
                      {line.startsWith('AI:') ? 'AI Agent' : 'User'}
                    </p>
                    <p>{line.replace(/^(AI:|User:)\s*/, '')}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Call Controls */}
          <div className="border-t border-green-700/50 p-3 bg-green-900/50">
            <div className="flex justify-center gap-4">
              <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.7l-1.91 1.89c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                </svg>
              </button>
              <button className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
