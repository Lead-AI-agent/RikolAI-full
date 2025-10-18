import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Customer } from "@/lib/mock-data"
import { Search, Filter, RotateCcw, Zap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LeadsTableProps {
  leads: Customer[]
  selectedLeads: string[]
  onSelectLead: (leadId: string) => void
  onSelectAll: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
  filters: {
    source: string
    status: string
    dateRange: string
  }
  onFiltersChange: (filters: any) => void
  onStartCampaign: (leadIds: string[]) => void
  onReset: () => void
  onViewDetail: (leadId: string) => void
}

export function LeadsTable({
  leads,
  selectedLeads,
  onSelectLead,
  onSelectAll,
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  onStartCampaign,
  onReset,
}: LeadsTableProps) {
  const [expandedFilters, setExpandedFilters] = useState(false)
  const navigate = useNavigate()

  const handleViewDetail = (leadId: string) => {
    navigate(`/leads/${leadId}`)
  }

  const handleStartCampaign = () => {
    onStartCampaign(selectedLeads)
  }

  const sourceOptions = ["WhatsApp", "Telegram", "Instagram", "Phone", "Store", "Website"]
  const statusOptions = ["New", "Active", "Engaged", "VIP", "Dormant"]

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          <button
            onClick={() => setExpandedFilters(!expandedFilters)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white flex items-center gap-2"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {expandedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <div>
              <label className="text-xs font-medium text-gray-300 block mb-2">Source</label>
              <select
                value={filters.source}
                onChange={(e) => onFiltersChange({ ...filters, source: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm"
              >
                <option value="all">All Sources</option>
                {sourceOptions.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-300 block mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-300 block mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleStartCampaign}
          disabled={selectedLeads.length === 0}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Zap size={18} />
          Send Recommendations ({selectedLeads.length})
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2 bg-transparent"
        >
          <RotateCcw size={18} />
          Reset Data
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length && leads.length > 0}
                    onChange={onSelectAll}
                    className="w-4 h-4 rounded border-white/20 bg-white/10 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Customer
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => onSelectLead(lead.id)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{lead.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-200">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                          style={{ width: `${lead.engagementScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-300">{lead.engagementScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">${lead.totalSpent?.toLocaleString() || '0'}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleViewDetail(lead.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No customers found matching your filters.</p>
        </div>
      )}
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "New":
      return "bg-blue-500/20 text-blue-200"
    case "Active":
      return "bg-green-500/20 text-green-200"
    case "Engaged":
      return "bg-purple-500/20 text-purple-200"
    case "VIP":
      return "bg-pink-500/20 text-pink-200"
    case "Dormant":
      return "bg-gray-500/20 text-gray-200"
    default:
      return "bg-white/10 text-gray-200"
  }
}
