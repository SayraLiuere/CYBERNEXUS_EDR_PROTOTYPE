import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import DashboardPage from './pages/DashboardPage'
import EndpointsPage from './pages/EndpointsPage'
import AlertsPage from './pages/AlertsPage'
import ReportsPage from './pages/ReportsPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/endpoints" element={<EndpointsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
