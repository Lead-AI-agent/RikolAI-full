import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, ShoppingBag, MessageSquare, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateMockCustomers } from "@/lib/mock-data"

// Mock data for charts
const weeklyEngagementData = [
  { day: "Mon", engaged: 240, rate: 24.5 },
  { day: "Tue", engaged: 320, rate: 28.2 },
  { day: "Wed", engaged: 280, rate: 25.8 },
  { day: "Thu", engaged: 400, rate: 35.2 },
  { day: "Fri", engaged: 480, rate: 42.1 },
  { day: "Sat", engaged: 390, rate: 38.9 },
  { day: "Sun", engaged: 290, rate: 30.2 },
]

const channelPerformanceData = [
  { channel: "WhatsApp", sent: 1200, opened: 950, clicked: 420, converted: 85 },
  { channel: "Instagram", sent: 900, opened: 720, clicked: 310, converted: 62 },
  { channel: "Telegram", sent: 600, opened: 480, clicked: 200, converted: 35 },
  { channel: "SMS", sent: 1500, opened: 1050, clicked: 520, converted: 110 },
]

const segmentData = [
  { name: "Dormant (60-90 days)", value: 2400, fill: "#6366f1" },
  { name: "Cold Leads", value: 1800, fill: "#0ea5e9" },
  { name: "Cart Abandoners", value: 1200, fill: "#f59e0b" },
  { name: "Active Customers", value: 3000, fill: "#10b981" },
]

const recentActivity = [
  { id: 1, type: "sent", customer: "Emma Rodriguez", campaign: "Spring Collection", time: "2 min ago", icon: "📤" },
  { id: 2, type: "opened", customer: "Jessica Park", campaign: "Summer Sale", time: "5 min ago", icon: "👁️" },
  { id: 3, type: "clicked", customer: "Alex Chen", campaign: "New Arrivals", time: "8 min ago", icon: "🖱️" },
  { id: 4, type: "converted", customer: "Sophie Williams", campaign: "Flash Deal", time: "12 min ago", icon: "✓" },
  { id: 5, type: "sent", customer: "Michael Brown", campaign: "Clearance Sale", time: "15 min ago", icon: "📤" },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const customers = generateMockCustomers()

  const metrics = useMemo(() => {
    const engaged = Math.floor(Math.random() * 500) + 1200
    const conversionRate = (engaged / customers.length * 100).toFixed(1)
    const recovered = (engaged * 125).toLocaleString()
    const campaigns = 7

    return {
      totalEngaged: engaged,
      conversionRate: parseFloat(conversionRate),
      recovered,
      campaigns,
      trend: {
        engaged: 12.5,
        conversion: 8.2,
        revenue: 15.3,
        campaigns: 2,
      }
    }
  }, [customers])

  return (
    <LayoutWrapper>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-400">Here's your re-engagement platform performance</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Total Engaged */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-400">Customers Re-engaged</p>
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Users size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{metrics.totalEngaged.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <ArrowUp size={14} className="text-green-400" />
              <span className="text-xs font-medium text-green-400">{metrics.trend.engaged}% from last month</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 hover:border-purple-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <TrendingUp size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{metrics.conversionRate}%</p>
            <div className="flex items-center gap-2">
              <ArrowUp size={14} className="text-green-400" />
              <span className="text-xs font-medium text-green-400">{metrics.trend.conversion}% from last month</span>
            </div>
          </div>
        </div>

        {/* Revenue Recovered */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-green-500/20 hover:border-green-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-400">Revenue Recovered</p>
              <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                <ShoppingBag size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">${metrics.recovered}</p>
            <div className="flex items-center gap-2">
              <ArrowUp size={14} className="text-green-400" />
              <span className="text-xs font-medium text-green-400">{metrics.trend.revenue}% from last month</span>
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-orange-500/20 hover:border-orange-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-400">Active Campaigns</p>
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                <MessageSquare size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{metrics.campaigns}</p>
            <div className="flex items-center gap-2">
              <ArrowUp size={14} className="text-green-400" />
              <span className="text-xs font-medium text-green-400">{metrics.trend.campaigns} new this week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Weekly Engagement Trend */}
        <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Weekly Engagement Trend</h3>
            <p className="text-sm text-gray-400">Customer engagement over the last 7 days</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyEngagementData}>
              <defs>
                <linearGradient id="colorEngaged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #64748b" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Line type="monotone" dataKey="engaged" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: "#0ea5e9" }} fillOpacity={1} fill="url(#colorEngaged)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segments */}
        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Customer Segments</h3>
            <p className="text-sm text-gray-400">Active customer breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #64748b" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {segmentData.map((seg) => (
              <div key={seg.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.fill }} />
                  <span className="text-gray-300">{seg.name}</span>
                </div>
                <span className="text-white font-medium">{seg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Performance & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Channel Performance */}
        <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Channel Performance</h3>
            <p className="text-sm text-gray-400">Performance metrics by communication channel</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="channel" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #64748b" }} />
              <Legend />
              <Bar dataKey="sent" stackId="a" fill="#0ea5e9" />
              <Bar dataKey="opened" stackId="a" fill="#06b6d4" />
              <Bar dataKey="clicked" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="converted" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Real-time Activity</h3>
            <p className="text-sm text-gray-400">Latest customer interactions</p>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="text-xl">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{activity.customer}</p>
                  <p className="text-xs text-gray-400 truncate">{activity.campaign}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button onClick={() => navigate('/campaigns')} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
          Start New Campaign
        </Button>
        <Button onClick={() => navigate('/analytics')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
          View Full Analytics
        </Button>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          Connect CRM
        </Button>
      </div>
    </LayoutWrapper>
  )
}
