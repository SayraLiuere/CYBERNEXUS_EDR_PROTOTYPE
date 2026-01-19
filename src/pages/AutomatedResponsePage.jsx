import React, { useState, useEffect } from 'react'
import responseActionsData from '../data/responseActions.json'
import './AutomatedResponsePage.css'

const AutomatedResponsePage = () => {
  const [actions, setActions] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    // Sort by timestamp (newest first)
    const sorted = [...responseActionsData].sort((a, b) => {
      const timeA = a.timestamp.split(':').map(Number)
      const timeB = b.timestamp.split(':').map(Number)
      const totalA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2]
      const totalB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2]
      return totalB - totalA
    })
    setActions(sorted)
  }, [])

  const filteredActions =
    filter === 'All'
      ? actions
      : actions.filter((a) => a.severity.toLowerCase() === filter.toLowerCase())

  const getStatusIcon = (status) => {
    return status === 'Success' ? '✓' : '⚠'
  }

  const getActionTypeColor = (action) => {
    if (action.includes('isolation') || action.includes('Isolation')) return '#f59e0b'
    if (action.includes('recovery') || action.includes('Recovery')) return '#22c55e'
    if (action.includes('terminated') || action.includes('Terminated')) return '#ef4444'
    if (action.includes('quarantine') || action.includes('Quarantine')) return '#8b5cf6'
    if (action.includes('blocked') || action.includes('Blocked')) return '#3b82f6'
    return '#6b7280'
  }

  const stats = {
    total: actions.length,
    today: actions.filter((a) => a.timestamp.startsWith('10:') || a.timestamp.startsWith('09:')).length,
    successful: actions.filter((a) => a.status === 'Success').length,
    highSeverity: actions.filter((a) => a.severity === 'High').length,
  }

  return (
    <div className="automated-response-page">
      <div className="response-header">
        <div>
          <h1 className="page-title">Automated Response Actions</h1>
          <p className="page-subtitle">
            Real-time log of automated security responses taken by CyberNexus EDR
          </p>
        </div>
        <div className="response-stats">
          <div className="stat-box">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Actions</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.today}</div>
            <div className="stat-label">Today</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.successful}</div>
            <div className="stat-label">Successful</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.highSeverity}</div>
            <div className="stat-label">High Severity</div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-buttons">
          {['All', 'High', 'Medium', 'Low'].map((severity) => (
            <button
              key={severity}
              className={`filter-btn ${filter === severity ? 'active' : ''}`}
              onClick={() => setFilter(severity)}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      <div className="actions-timeline">
        {filteredActions.map((action) => (
          <div key={action.id} className="action-item">
            <div className="action-timeline-line"></div>
            <div className="action-icon" style={{ backgroundColor: getActionTypeColor(action.action) + '20', color: getActionTypeColor(action.action) }}>
              {action.icon}
            </div>
            <div className="action-content">
              <div className="action-header">
                <div className="action-title-row">
                  <h3 className="action-title">{action.action}</h3>
                  <span className="action-status" data-status={action.status.toLowerCase()}>
                    {getStatusIcon(action.status)} {action.status}
                  </span>
                </div>
                <div className="action-meta">
                  <span className="action-time">{action.timestamp}</span>
                  <span className="action-endpoint">{action.endpoint}</span>
                  <span className={`action-severity severity-${action.severity.toLowerCase()}`}>
                    {action.severity}
                  </span>
                </div>
              </div>
              <p className="action-description">{action.description}</p>
              <div className="action-trigger">
                <span className="trigger-label">Triggered by:</span>
                <span className="trigger-value">{action.triggeredBy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActions.length === 0 && (
        <div className="no-actions">
          <p>No automated actions found for the selected filter.</p>
        </div>
      )}
    </div>
  )
}

export default AutomatedResponsePage
