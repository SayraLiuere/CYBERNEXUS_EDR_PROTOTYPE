import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'
import { DETECTORS, DETECTOR_LABELS } from '../utils/detectors'

const NavBar = ({ detector, setDetector }) => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-logo">🛡️</span>
          <span className="brand-text">CyberNexus EDR</span>
        </div>
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/endpoints" 
            className={`nav-link ${isActive('/endpoints') ? 'active' : ''}`}
          >
            Endpoints
          </Link>
          <Link 
            to="/alerts" 
            className={`nav-link ${isActive('/alerts') ? 'active' : ''}`}
          >
            Alerts
          </Link>
          <Link 
            to="/reports" 
            className={`nav-link ${isActive('/reports') ? 'active' : ''}`}
          >
            Reports
          </Link>
          <Link 
            to="/response" 
            className={`nav-link ${isActive('/response') ? 'active' : ''}`}
          >
            Response
          </Link>
        </div>
        <div className="navbar-detector">
          <div className="detector-label">Detector</div>
          <select
            className="detector-select"
            value={detector}
            onChange={(e) => setDetector(e.target.value)}
            aria-label="Select detection engine"
          >
            <option value={DETECTORS.LegacyAV}>{DETECTOR_LABELS[DETECTORS.LegacyAV]}</option>
            <option value={DETECTORS.CyberNexus}>{DETECTOR_LABELS[DETECTORS.CyberNexus]}</option>
          </select>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
