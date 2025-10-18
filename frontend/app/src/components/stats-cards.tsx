import type { Customer } from "@/lib/mock-data"
import { Users, Zap, CheckCircle, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  customers: Customer[]
}

export function StatsCards({ customers }: StatsCardsProps) {
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "Active").length
  const vipCustomers = customers.filter((c) => c.status === "VIP").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  const stats = [
    { label: "Total Customers", value: totalCustomers, icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Active Customers", value: activeCustomers, icon: Zap, color: "from-green-500 to-green-600" },
    { label: "VIP Customers", value: vipCustomers, icon: CheckCircle, color: "from-purple-500 to-purple-600" },
    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "from-orange-500 to-orange-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">{stat.label}</h3>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
