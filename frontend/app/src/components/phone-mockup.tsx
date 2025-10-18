import { MessageCircle } from "lucide-react"

interface Message {
  role: "ai" | "user"
  text: string
  timestamp: number
}

interface PhoneMockupProps {
  leadName: string
  messages: Message[]
}

export function PhoneMockup({ leadName, messages }: PhoneMockupProps) {
  return (
    <div className="w-80 flex-shrink-0">
      {/* Phone Frame */}
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl border-8 border-gray-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="h-6 bg-black flex items-center justify-center">
          <div className="w-32 h-5 bg-black rounded-b-2xl" />
        </div>

        {/* Screen */}
        <div className="bg-white/5 h-96 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{leadName}</p>
              <p className="text-white/70 text-xs">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-xs text-center">Waiting for messages...</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-white/10 text-gray-100 rounded-bl-none"
                        : "bg-blue-600 text-white rounded-br-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 bg-slate-900/50">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type a message..."
                disabled
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs text-gray-400 placeholder:text-gray-600"
              />
              <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
