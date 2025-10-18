import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu, X, BarChart3, Users, LogOut, Zap, TrendingUp } from "lucide-react"

interface SidebarProps {
  onLogout?: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    {
      label: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
      description: "Analytics & Statistics",
    },
    {
      label: "Leads",
      icon: Users,
      path: "/leads",
      description: "Manage Customers",
    },
    {
      label: "Campaigns",
      icon: Zap,
      path: "/campaigns",
      description: "Manage Marketing Campaigns",
    },
    {
      label: "Analytics",
      icon: TrendingUp,
      path: "/analytics",
      description: "View Detailed Analytics",
    },
  ]

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/")

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-white/10 transition-all duration-300 z-40 w-64 overflow-hidden`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">🚀</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Rikol AI</h1>
              <p className="text-xs text-gray-400">Fashion Platform</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/50"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-4 border-t border-white/10" />

        {/* Bottom Actions */}
        <div className="p-4 space-y-2 absolute bottom-0 left-0 right-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="lg:ml-64">
        {/* This will be filled by the layout wrapper */}
      </div>
    </>
  )
}
