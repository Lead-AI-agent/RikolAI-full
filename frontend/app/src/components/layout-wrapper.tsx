import { Sidebar } from "./sidebar"
import { DashboardHeader } from "./dashboard-header"
import { ReactNode } from "react"

interface LayoutWrapperProps {
  children: ReactNode
  onLogout?: () => void
  showHeader?: boolean
}

export function LayoutWrapper({ children, onLogout, showHeader = true }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar onLogout={onLogout} />
      
      {/* Main content area with proper spacing for sidebar */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {showHeader && <DashboardHeader onLogout={onLogout} />}
        <main className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
