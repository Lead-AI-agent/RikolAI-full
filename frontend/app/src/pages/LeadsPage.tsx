import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { generateMockCustomers } from "@/lib/mock-data"

export default function LeadsPage() {
  const navigate = useNavigate()
  const allLeads = generateMockCustomers()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLeads = allLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleLogout = () => {
    localStorage.removeItem('aicrm_login')
    navigate('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-500/20 text-blue-200 border-blue-500/30"
      case "Active": return "bg-green-500/20 text-green-200 border-green-500/30"
      case "Engaged": return "bg-purple-500/20 text-purple-200 border-purple-500/30"
      case "VIP": return "bg-pink-500/20 text-pink-200 border-pink-500/30"
      case "Dormant": return "bg-gray-500/20 text-gray-200 border-gray-500/30"
      default: return "bg-white/10 text-gray-200"
    }
  }

  return (
    <LayoutWrapper onLogout={handleLogout}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Leads
        </h1>
        <p className="text-gray-400">View and manage all your customers</p>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
        >
          <option value="all">All Status</option>
          <option value="New">New</option>
          <option value="Active">Active</option>
          <option value="Engaged">Engaged</option>
          <option value="VIP">VIP</option>
          <option value="Dormant">Dormant</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigate(`/leads/${lead.id}`)}>
                  <td className="px-6 py-4 text-sm font-medium text-white flex items-center gap-2">
                    {lead.name}
                    {lead.status === "VIP" && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{lead.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{lead.location}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-200">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                          style={{ width: `${lead.engagementScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-300">{lead.engagementScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">${lead.totalSpent.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No leads found matching your filters.</p>
        </div>
      )}
    </LayoutWrapper>
  )
}
