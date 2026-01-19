import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import siemEventsData from '../data/siemEvents.json'
import './ReportsPage.css'

const ReportsPage = () => {
  const [siemEvents, setSiemEvents] = useState([])
  const [isPDPAModalOpen, setIsPDPAModalOpen] = useState(false)

  useEffect(() => {
    // Filter events from last 24 hours (simulated)
    setSiemEvents(siemEventsData)
  }, [])

  return (
    <div className="reports-page">
      <h1 className="page-title">Integration & Reports</h1>

      <div className="reports-grid">
        <div className="siem-section">
          <h2 className="section-title">SIEM/SOAR Integration</h2>
          <div className="siem-card">
            <div className="siem-header">
              <h3>Events sent to SIEM (last 24h)</h3>
              <span className="event-count">{siemEvents.length} events</span>
            </div>
            <div className="siem-events-list">
              {siemEvents.map(event => (
                <div key={event.id} className="siem-event-item">
                  <div className="event-info">
                    <span className="event-endpoint">{event.endpoint}</span>
                    <span className="event-separator">–</span>
                    <span className="event-type">{event.event}</span>
                  </div>
                  <div className="event-meta">
                    <span className="event-time">{event.timestamp}</span>
                    <span className="event-method">Sent via {event.sentVia}</span>
                  </div>
                </div>
              ))}
              {siemEvents.length === 0 && (
                <div className="no-events">No events in the last 24 hours</div>
              )}
            </div>
          </div>
        </div>

        <div className="pdpa-section">
          <h2 className="section-title">PDPA/Compliance Report</h2>
          <div className="pdpa-card">
            <p className="pdpa-description">
              Generate a comprehensive PDPA compliance report detailing data collection,
              retention policies, and access controls.
            </p>
            <button 
              className="btn-generate-report"
              onClick={() => setIsPDPAModalOpen(true)}
            >
              Generate PDPA Compliance Report
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isPDPAModalOpen}
        onClose={() => setIsPDPAModalOpen(false)}
        title="PDPA Compliance Report"
      >
        <div className="pdpa-report">
          <section className="report-section">
            <h3>Data Collection</h3>
            <p>The following data types are collected by CyberNexus EDR:</p>
            <ul>
              <li><strong>Telemetry Data:</strong> System performance metrics (CPU, RAM usage), process information, network activity</li>
              <li><strong>Security Logs:</strong> Authentication events, file access patterns, suspicious behavior indicators</li>
              <li><strong>Endpoint Information:</strong> Device name, department, deployment phase, status</li>
              <li><strong>Alert Data:</strong> Security alerts, threat detections, response actions taken</li>
            </ul>
          </section>

          <section className="report-section">
            <h3>Data Retention</h3>
            <p>Data retention policies are designed to balance security needs with privacy requirements:</p>
            <ul>
              <li><strong>Forensic Search Window:</strong> 30 days</li>
              <li><strong>Alert History:</strong> Retained for 90 days for analysis and compliance purposes</li>
              <li><strong>Endpoint Telemetry:</strong> Real-time data with 7-day rolling window for historical analysis</li>
              <li><strong>SIEM Integration Logs:</strong> Retained according to SIEM system policies (typically 1 year)</li>
            </ul>
          </section>

          <section className="report-section">
            <h3>Access Control & Audit</h3>
            <p>Access to collected data is strictly controlled:</p>
            <ul>
              <li><strong>Role-Based Access:</strong> Only authorized security personnel have access to endpoint data</li>
              <li><strong>Audit Logging:</strong> All access to sensitive data is logged with timestamp, user, and action details</li>
              <li><strong>Data Minimization:</strong> Only necessary data for threat detection and response is collected</li>
              <li><strong>Encryption:</strong> Data in transit and at rest is encrypted using industry-standard protocols</li>
            </ul>
          </section>

          <section className="report-section">
            <h3>Data Subject Rights</h3>
            <p>In compliance with PDPA, data subjects have the right to:</p>
            <ul>
              <li>Request access to their personal data collected by the system</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of data (subject to legal and security requirements)</li>
              <li>Be notified of data breaches affecting their personal information</li>
            </ul>
          </section>

          <div className="report-footer">
            <p><strong>Report Generated:</strong> {new Date().toLocaleString()}</p>
            <p><strong>System Version:</strong> CyberNexus EDR v1.0</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ReportsPage
