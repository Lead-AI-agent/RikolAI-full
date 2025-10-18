import { useState } from "react"
import { Moon, Sun, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  onLogout?: () => void
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-30 w-full">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">🚀</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Rikol AI</h1>
            <p className="text-xs text-gray-400">Fashion Intelligence Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Logout Button */}
          {onLogout && (
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="p-2 text-white hover:bg-red-500/20 hover:text-red-200"
            >
              <LogOut size={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
