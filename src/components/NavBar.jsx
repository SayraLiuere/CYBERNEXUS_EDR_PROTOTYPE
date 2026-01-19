import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
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
        </div>
      </div>
    </nav>
  )
}

export default NavBar
