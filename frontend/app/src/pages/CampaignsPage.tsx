import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Plus, MessageSquare, Users, Pause, Play, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockCampaigns = [
  {
    id: 1,
    name: "Spring Collection Launch",
    audience: "Dormant customers",
    channels: ["WhatsApp", "Instagram"],
    stats: { sent: 1200, opened: 950, clicked: 420, converted: 85 },
    status: "active",
    progress: 75,
  },
  {
    id: 2,
    name: "Summer Sale",
    audience: "Cart abandoners",
    channels: ["SMS", "Telegram"],
    stats: { sent: 800, opened: 640, clicked: 320, converted: 62 },
    status: "active",
    progress: 60,
  },
  {
    id: 3,
    name: "Flash Deal 48h",
    audience: "Cold leads",
    channels: ["WhatsApp", "Instagram", "SMS"],
    stats: { sent: 2500, opened: 1875, clicked: 1000, converted: 250 },
    status: "completed",
    progress: 100,
  },
  {
    id: 4,
    name: "New Year Clearance",
    audience: "All dormant",
    channels: ["Email", "SMS"],
    stats: { sent: 5000, opened: 3500, clicked: 1750, converted: 350 },
    status: "paused",
    progress: 35,
  },
]

export default function CampaignsPage() {
  const navigate = useNavigate()
  const [campaigns] = useState(mockCampaigns)
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCampaigns = statusFilter === "all" ? campaigns : campaigns.filter(c => c.status === statusFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-300 border-green-500/30"
      case "paused": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "completed": return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getConversionRate = (stats: any) => {
    return ((stats.converted / stats.sent) * 100).toFixed(1)
  }

  return (
    <LayoutWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Campaigns
          </h1>
          <p className="text-gray-400">Manage and monitor your re-engagement campaigns</p>
        </div>
        <Button onClick={() => navigate('/campaigns/create')} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white flex items-center gap-2">
          <Plus size={18} />
          Create Campaign
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {["all", "active", "paused", "completed"].map(filter => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-4 py-2 rounded-lg capitalize transition-all ${
              statusFilter === filter
                ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
                : "bg-white/5 text-gray-300 border border-white/10 hover:border-white/20"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCampaigns.map(campaign => (
          <div key={campaign.id} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-cyan-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{campaign.name}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users size={16} />
                      {campaign.audience}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MessageSquare size={16} />
                      {campaign.channels.join(", ")}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{campaign.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{campaign.stats.sent}</p>
                  <p className="text-xs text-gray-400 mt-1">Sent</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{((campaign.stats.opened / campaign.stats.sent) * 100).toFixed(0)}%</p>
                  <p className="text-xs text-gray-400 mt-1">Open Rate</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{((campaign.stats.clicked / campaign.stats.sent) * 100).toFixed(1)}%</p>
                  <p className="text-xs text-gray-400 mt-1">CTR</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-white">{getConversionRate(campaign.stats)}%</p>
                  <p className="text-xs text-gray-400 mt-1">Conv. Rate</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  {campaign.status === "active" ? <Pause size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
                  {campaign.status === "active" ? "Pause" : "Resume"}
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  <Archive size={16} className="mr-2" />
                  Archive
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LayoutWrapper>
  )
}
