import React from 'react'
import './Sidebar.css'

const Sidebar = ({ pilotCount = 0, criticalCount = 0 }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Quick Stats</h3>
        <div className="sidebar-stat">
          <span className="sidebar-label">Pilot phase</span>
          <span className="sidebar-value">{pilotCount} endpoints</span>
        </div>
        <div className="sidebar-stat">
          <span className="sidebar-label">Critical assets</span>
          <span className="sidebar-value">{criticalCount} endpoints</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
