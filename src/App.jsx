import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import DashboardPage from './pages/DashboardPage'
import EndpointsPage from './pages/EndpointsPage'
import AlertsPage from './pages/AlertsPage'
import ReportsPage from './pages/ReportsPage'
import './App.css'
import { DETECTORS } from './utils/detectors'

function App() {
  const [detector, setDetector] = useState(DETECTORS.CyberNexus)

  return (
    <Router>
      <div className="app">
        <NavBar detector={detector} setDetector={setDetector} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage detector={detector} />} />
            <Route path="/endpoints" element={<EndpointsPage detector={detector} />} />
            <Route path="/alerts" element={<AlertsPage detector={detector} />} />
            <Route path="/reports" element={<ReportsPage detector={detector} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
