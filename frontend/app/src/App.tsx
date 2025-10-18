import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SimulationPage from './pages/SimulationPage'
import LeadDetailPage from './pages/LeadDetailPage'
import DashboardPage from './pages/DashboardPage'
import LeadsPage from './pages/LeadsPage'
import CampaignsPage from './pages/CampaignsPage'
import AnalyticsPage from './pages/AnalyticsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/leads" element={<LeadsPage />} />
      <Route path="/leads/:id" element={<LeadDetailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/simulation" element={<SimulationPage />} />
    </Routes>
  )
}

export default App
