import React, { useState, useEffect } from 'react'
import SeverityBadge from '../components/SeverityBadge'
import alertsData from '../data/alerts.json'
import endpointsData from '../data/endpoints.json'
import './AlertsPage.css'

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState('All')
  const [showConfirmation, setShowConfirmation] = useState(null)
  const [tuningLog, setTuningLog] = useState([])

  useEffect(() => {
    setAlerts(alertsData)
  }, [])

  const filteredAlerts = filter === 'All' 
    ? alerts 
    : alerts.filter(a => a.severity.toLowerCase() === filter.toLowerCase())

  const handleAutoRecover = (alert) => {
    setShowConfirmation({
      type: 'auto-recover',
      message: 'Files restored from snapshot, user notified.',
      alertId: alert.id
    })
    
    setTimeout(() => {
      setAlerts(alerts.map(a => 
        a.id === alert.id 
          ? { ...a, status: 'Resolved', autoRecovered: true }
          : a
      ))
      setShowConfirmation(null)
    }, 2000)
  }

  const handleIsolate = (alert) => {
    setAlerts(alerts.map(a => 
      a.id === alert.id 
        ? { ...a, status: 'Open', endpointIsolated: true }
        : a
    ))
  }

  const handleFalsePositive = (alert) => {
    const newEntry = {
      id: Date.now(),
      alertId: alert.id,
      endpoint: alert.endpoint,
      type: alert.type,
      timestamp: new Date().toLocaleTimeString()
    }
    setTuningLog([...tuningLog, newEntry])
    setAlerts(alerts.map(a => 
      a.id === alert.id 
        ? { ...a, status: 'Closed – False positive' }
        : a
    ))
  }

  return (
    <div className="alerts-page">
      <h1 className="page-title">Alerts & Response</h1>

      <div className="filter-buttons">
        {['All', 'High', 'Medium', 'Low'].map(severity => (
          <button
            key={severity}
            className={`filter-btn ${filter === severity ? 'active' : ''}`}
            onClick={() => setFilter(severity)}
          >
            {severity}
          </button>
        ))}
      </div>

      {showConfirmation && (
        <div className="confirmation-message">
          {showConfirmation.message}
        </div>
      )}

      <div className="table-container">
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Endpoint</th>
              <th>Severity</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map(alert => (
              <tr key={alert.id}>
                <td>{alert.time}</td>
                <td className="endpoint-name">{alert.endpoint}</td>
                <td>
                  <SeverityBadge severity={alert.severity} />
                </td>
                <td>{alert.type}</td>
                <td>
                  <span className={`alert-status ${alert.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {alert.status}
                    {alert.endpointIsolated && (
                      <span className="isolated-tag"> • Endpoint isolated</span>
                    )}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {alert.status === 'Open' && (
                      <>
                        <button
                          className="btn-action btn-auto-recover"
                          onClick={() => handleAutoRecover(alert)}
                        >
                          Auto-recover
                        </button>
                        <button
                          className="btn-action btn-isolate"
                          onClick={() => handleIsolate(alert)}
                        >
                          Isolate
                        </button>
                        <button
                          className="btn-action btn-false-positive"
                          onClick={() => handleFalsePositive(alert)}
                        >
                          False positive
                        </button>
                      </>
                    )}
                    {alert.status === 'Resolved' && alert.autoRecovered && (
                      <span className="resolved-badge">✓ Auto-recovered</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tuningLog.length > 0 && (
        <div className="tuning-log-section">
          <h2 className="section-title">Tuning Log</h2>
          <div className="tuning-log">
            {tuningLog.map(entry => (
              <div key={entry.id} className="tuning-log-entry">
                <span className="tuning-timestamp">{entry.timestamp}</span>
                <span className="tuning-details">
                  {entry.endpoint} – {entry.type} – Marked as false positive
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AlertsPage
