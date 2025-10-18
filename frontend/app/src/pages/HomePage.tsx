import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { StatsCards } from "@/components/stats-cards"
import { LeadsTable } from "@/components/leads-table"
import { SimpleLogin } from "@/components/simple-login"
import { generateMockCustomers } from "@/lib/mock-data"

export default function HomePage() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customers, setCustomers] = useState(generateMockCustomers())
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    source: "all",
    status: "all",
    dateRange: "all",
  })

  // Check for existing login session on component mount
  useEffect(() => {
    const savedLogin = localStorage.getItem('aicrm_login')
    if (savedLogin) {
      setIsLoggedIn(true)
    }
  }, [])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = filters.source === "all" || customer.source === filters.source
    const matchesStatus = filters.status === "all" || customer.status === filters.status
    return matchesSearch && matchesSource && matchesStatus
  })

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers((prev) => (prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId]))
  }

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
    }
  }

  const handleStartCampaign = (customerIds: string[]) => {
    if (customerIds.length === 0) return
    const customerIdsParam = customerIds.join(',')
    navigate(`/simulation?customers=${customerIdsParam}`)
  }

  const handleReset = () => {
    setCustomers(generateMockCustomers())
    setSelectedCustomers([])
  }

  const handleLogin = (username: string, password: string) => {
    // Simple admin authentication
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true)
      localStorage.setItem('aicrm_login', 'true')
    } else {
      alert("Invalid credentials. Please use admin/admin")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('aicrm_login')
    setSelectedCustomers([])
    setSearchTerm("")
    setFilters({ source: "all", status: "all", dateRange: "all" })
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <SimpleLogin onLogin={handleLogin} />
  }

  // Show dashboard if logged in
  return (
    <LayoutWrapper onLogout={handleLogout}>
      <StatsCards customers={customers} />
      <LeadsTable
        leads={filteredCustomers}
        selectedLeads={selectedCustomers}
        onSelectLead={handleSelectCustomer}
        onSelectAll={handleSelectAll}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        onStartCampaign={handleStartCampaign}
        onReset={handleReset}
        onViewDetail={() => { }}
      />
    </LayoutWrapper>
  )
}
