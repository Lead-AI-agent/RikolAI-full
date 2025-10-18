import { LayoutWrapper } from "@/components/layout-wrapper"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const revenueData = [
  { date: "Jan 1", recovered: 4000 },
  { date: "Jan 8", recovered: 3000 },
  { date: "Jan 15", recovered: 4200 },
  { date: "Jan 22", recovered: 5100 },
  { date: "Jan 29", recovered: 6200 },
]

const channelData = [
  { channel: "WhatsApp", revenue: 12500 },
  { channel: "Instagram", revenue: 9800 },
  { channel: "SMS", revenue: 15200 },
  { channel: "Telegram", revenue: 7600 },
]

export default function AnalyticsPage() {
  return (
    <LayoutWrapper>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Analytics
        </h1>
        <p className="text-gray-400">Comprehensive performance insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 p-6">
          <p className="text-sm text-gray-400 mb-2">Total Revenue Recovered</p>
          <p className="text-3xl font-bold text-white mb-2">$52,800</p>
          <div className="flex items-center gap-2">
            <ArrowUp size={14} className="text-green-400" />
            <span className="text-xs text-green-400">23.5% increase</span>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 p-6">
          <p className="text-sm text-gray-400 mb-2">Reactivation Rate</p>
          <p className="text-3xl font-bold text-white mb-2">28.4%</p>
          <div className="flex items-center gap-2">
            <ArrowUp size={14} className="text-green-400" />
            <span className="text-xs text-green-400">5.2% increase</span>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-green-500/20 p-6">
          <p className="text-sm text-gray-400 mb-2">Average Order Value</p>
          <p className="text-3xl font-bold text-white mb-2">$184</p>
          <div className="flex items-center gap-2">
            <ArrowUp size={14} className="text-green-400" />
            <span className="text-xs text-green-400">12.3% increase</span>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-orange-500/20 p-6">
          <p className="text-sm text-gray-400 mb-2">ROI</p>
          <p className="text-3xl font-bold text-white mb-2">3.2x</p>
          <div className="flex items-center gap-2">
            <ArrowUp size={14} className="text-green-400" />
            <span className="text-xs text-green-400">18% increase</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Recovered Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #64748b" }} />
              <Line type="monotone" dataKey="recovered" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: "#0ea5e9" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue by Channel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="channel" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #64748b" }} />
              <Bar dataKey="revenue" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
        Export Report (PDF)
      </Button>
    </LayoutWrapper>
  )
}
