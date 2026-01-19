import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import SeverityBadge from '../components/SeverityBadge'
import Sidebar from '../components/Sidebar'
import endpointsData from '../data/endpoints.json'
import alertsData from '../data/alerts.json'
import './DashboardPage.css'
import { DETECTORS, isDetectableBy } from '../utils/detectors'

const DashboardPage = ({ detector }) => {
  const navigate = useNavigate()
  const [endpoints, setEndpoints] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    setEndpoints(endpointsData)
    setAlerts(alertsData.filter(a => a.status === 'Open'))
  }, [])

  const visibleOpenAlerts =
    detector === DETECTORS.CyberNexus ? alerts : alerts.filter((a) => isDetectableBy(a, detector))

  const protectedEndpoints = endpoints.length
  const openAlerts = visibleOpenAlerts.length
  const ransomwareBlocked = visibleOpenAlerts.filter(a => a.type.includes('Ransomware')).length
  const avgCpuUsage = endpoints.reduce((sum, e) => sum + e.cpuUsage, 0) / endpoints.length

  const handleViewAlert = (alertId) => {
    navigate(`/alerts?alert=${alertId}`)
  }

  const pilotEndpoints = endpoints.filter(e => e.phase === 'Pilot').length
  const criticalEndpoints = endpoints.filter(e => e.tags.includes('Critical asset')).length
  const missedByLegacy =
    alerts.filter((a) => a.status === 'Open').filter((a) => !isDetectableBy(a, DETECTORS.LegacyAV)).length
  const legacyVisible =
    alerts.filter((a) => a.status === 'Open').filter((a) => isDetectableBy(a, DETECTORS.LegacyAV))
  const extraDetectedByCnx =
    detector === DETECTORS.CyberNexus ? Math.max(0, visibleOpenAlerts.length - legacyVisible.length) : 0

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="page-title">
          Dashboard
          {detector === DETECTORS.LegacyAV && missedByLegacy > 0 && (
            <span>{`Legacy AV misses ${missedByLegacy} active threat(s)`}</span>
          )}
        </h1>
        {detector === DETECTORS.CyberNexus && extraDetectedByCnx > 0 && (
          <p className="page-subtitle">
            CyberNexus EDR reveals <strong>{extraDetectedByCnx}</strong> additional behavioral threat(s) compared to Legacy AV.
          </p>
        )}
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="stats-grid">
            <StatCard 
              title="Protected endpoints" 
              value={protectedEndpoints}
              icon="🖥️"
            />
            <StatCard 
              title="Open alerts" 
              value={openAlerts}
              icon="⚠️"
            />
            <StatCard 
              title="Ransomware blocked (this week)" 
              value={ransomwareBlocked}
              icon="🛡️"
            />
            <StatCard 
              title="Avg CPU usage by agent" 
              value={`${avgCpuUsage.toFixed(1)}%`}
              icon="📊"
            />
          </div>

          <div className="alerts-section">
            <h2 className="section-title">Recent Alerts</h2>
            <div className="alerts-list">
              {visibleOpenAlerts.slice(0, 5).map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-info">
                    <SeverityBadge severity={alert.severity} />
                    <span className="alert-text">
                      {alert.type} detected on {alert.endpoint}
                    </span>
                  </div>
                  <button 
                    className="btn-view-alert"
                    onClick={() => handleViewAlert(alert.id)}
                  >
                    View alert
                  </button>
                </div>
              ))}
              {visibleOpenAlerts.length === 0 && (
                <div className="no-alerts">No open alerts</div>
              )}
            </div>
          </div>
        </div>
        <Sidebar pilotCount={pilotEndpoints} criticalCount={criticalEndpoints} />
      </div>
    </div>
  )
}

export default DashboardPage
