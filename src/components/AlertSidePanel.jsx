import React, { useState, useEffect } from 'react'
import SeverityBadge from './SeverityBadge'
import './AlertSidePanel.css'

const AlertSidePanel = ({ alert, isOpen, onClose, onNotesChange }) => {
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (alert) {
      // Load saved notes from localStorage (simulating persistence)
      const savedNotes = localStorage.getItem(`alert-notes-${alert.id}`) || ''
      setNotes(savedNotes)
    }
  }, [alert])

  const handleNotesChange = (e) => {
    const newNotes = e.target.value
    setNotes(newNotes)
    // Save to localStorage
    if (alert) {
      localStorage.setItem(`alert-notes-${alert.id}`, newNotes)
    }
    if (onNotesChange) {
      onNotesChange(alert.id, newNotes)
    }
  }

  if (!isOpen || !alert) return null

  return (
    <div className="alert-sidepanel-overlay" onClick={onClose}>
      <div className="alert-sidepanel" onClick={(e) => e.stopPropagation()}>
        <div className="sidepanel-header">
          <h2>Alert Details</h2>
          <button className="sidepanel-close" onClick={onClose}>×</button>
        </div>
        
        <div className="sidepanel-body">
          <div className="alert-summary">
            <div className="summary-row">
              <span className="summary-label">Time:</span>
              <span className="summary-value">{alert.time}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Endpoint:</span>
              <span className="summary-value">{alert.endpoint}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Severity:</span>
              <SeverityBadge severity={alert.severity} />
            </div>
            <div className="summary-row">
              <span className="summary-label">Type:</span>
              <span className="summary-value">{alert.type}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Status:</span>
              <span className={`summary-status status-${alert.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {alert.status}
              </span>
            </div>
          </div>

          <div className="analyst-notes-section">
            <h3>Analyst Notes</h3>
            <textarea
              className="notes-textarea"
              placeholder="Add investigation notes, observations, or action items..."
              value={notes}
              onChange={handleNotesChange}
              rows={8}
            />
            {notes && (
              <div className="notes-info">
                <span className="notes-count">{notes.length} characters</span>
                <span className="notes-saved">✓ Saved</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertSidePanel
