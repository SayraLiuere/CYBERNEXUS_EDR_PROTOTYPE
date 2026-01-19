import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import endpointsData from '../data/endpoints.json'
import alertsData from '../data/alerts.json'
import responseActionsData from '../data/responseActions.json'
import { calculateRiskScore, getRiskBadgeClass } from '../utils/riskScore'
import { buildAttackTimeline } from '../utils/attackTimeline'
import './EndpointsPage.css'

const EndpointsPage = ({ detector }) => {
  const [endpoints, setEndpoints] = useState([])
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [alerts] = useState(alertsData)
  const [responseActions] = useState(responseActionsData)
  const [phaseFilter, setPhaseFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    setEndpoints(endpointsData)
  }, [])

  const handleRowClick = (endpoint) => {
    setSelectedEndpoint(endpoint)
    setIsModalOpen(true)
  }

  const handleIsolate = () => {
    if (selectedEndpoint) {
      setEndpoints(endpoints.map(e => 
        e.id === selectedEndpoint.id 
          ? { ...e, status: 'Isolated' }
          : e
      ))
      setSelectedEndpoint({ ...selectedEndpoint, status: 'Isolated' })
    }
  }

  const handleRejoin = () => {
    if (selectedEndpoint) {
      setEndpoints(endpoints.map(e => 
        e.id === selectedEndpoint.id 
          ? { ...e, status: 'Healthy' }
          : e
      ))
      setSelectedEndpoint({ ...selectedEndpoint, status: 'Healthy' })
    }
  }

  const getStatusClass = (status) => {
    if (status === 'Healthy') return 'status-healthy'
    if (status === 'Under attack') return 'status-attack'
    if (status === 'Isolated') return 'status-isolated'
    return ''
  }

  const getPhaseClass = (phase) => {
    if (phase === 'Pilot') return 'phase-pilot'
    if (phase === 'Critical') return 'phase-critical'
    if (phase === 'Full deployment') return 'phase-full'
    return ''
  }

  const filteredEndpoints = endpoints.filter((e) => {
    const phaseOk = phaseFilter === 'All' || e.phase === phaseFilter
    const statusOk = statusFilter === 'All' || e.status === statusFilter
    return phaseOk && statusOk
  })

  const buildCpuTrend = (cpuBase) => {
    const base = cpuBase || 0.5
    const deltas = [-0.2, -0.1, 0, 0.05, 0.1, -0.05]
    return deltas.map((d) => Math.max(0.1, Math.min(1, base + d)))
  }

  return (
    <div className="endpoints-page">
      <div className="endpoints-header-row">
        <h1 className="page-title">Endpoints</h1>
        <div className="endpoints-filters">
          <div className="endpoint-filter-group">
            <span className="filter-label">Phase</span>
            {['All', 'Pilot', 'Critical', 'Full deployment'].map((p) => (
              <button
                key={p}
                className={`endpoint-filter-btn ${phaseFilter === p ? 'active' : ''}`}
                onClick={() => setPhaseFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="endpoint-filter-group">
            <span className="filter-label">Status</span>
            {['All', 'Healthy', 'Under attack', 'Isolated'].map((s) => (
              <button
                key={s}
                className={`endpoint-filter-btn ${statusFilter === s ? 'active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="endpoints-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Phase</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>CPU Usage (%)</th>
              <th>RAM Usage (%)</th>
            </tr>
          </thead>
          <tbody>
            {filteredEndpoints.map(endpoint => {
              const riskScore = calculateRiskScore(endpoint, alerts)
              const riskClass = getRiskBadgeClass(riskScore)
              return (
                <tr 
                  key={endpoint.id} 
                  className="table-row"
                  onClick={() => handleRowClick(endpoint)}
                >
                  <td className="endpoint-name">{endpoint.name}</td>
                  <td>{endpoint.department}</td>
                  <td>
                    <span className={`phase-badge ${getPhaseClass(endpoint.phase)}`}>
                      {endpoint.phase}
                    </span>
                  </td>
                  <td>
                    <span className={`risk-badge ${riskClass}`}>
                      {riskScore}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(endpoint.status)}`}>
                      {endpoint.status}
                    </span>
                  </td>
                  <td>{endpoint.cpuUsage}%</td>
                  <td>{endpoint.ramUsage}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEndpoint ? `${selectedEndpoint.name} Details` : 'Endpoint Details'}
      >
        {selectedEndpoint && (
          <div className="endpoint-details">
            <div className="endpoint-header">
              <h3>{selectedEndpoint.name}</h3>
              <div className="endpoint-tags">
                {selectedEndpoint.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="endpoint-info">
              <div className="info-row">
                <span className="info-label">Department:</span>
                <span>{selectedEndpoint.department}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phase:</span>
                <span className={`phase-badge ${getPhaseClass(selectedEndpoint.phase)}`}>
                  {selectedEndpoint.phase}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Risk Score:</span>
                <span className={`risk-badge ${getRiskBadgeClass(calculateRiskScore(selectedEndpoint, alerts))}`}>
                  {calculateRiskScore(selectedEndpoint, alerts)}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={`status-badge ${getStatusClass(selectedEndpoint.status)}`}>
                  {selectedEndpoint.status}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">CPU Usage:</span>
                <span>{selectedEndpoint.cpuUsage}%</span>
              </div>
              <div className="info-row">
                <span className="info-label">RAM Usage:</span>
                <span>{selectedEndpoint.ramUsage}%</span>
              </div>
            </div>

            <div className="health-trend">
              <h4>CPU Health (last 6 checks)</h4>
              <div className="health-bars">
                {buildCpuTrend(selectedEndpoint.cpuUsage).map((v, idx) => (
                  <div
                    key={idx}
                    className="health-bar"
                    style={{ height: `${v * 60}px` }}
                    title={`${(v * 100).toFixed(1)}%`}
                  />
                ))}
              </div>
            </div>

            {selectedEndpoint.status === 'Under attack' && (
              <div className="attack-timeline">
                <h4>Attack Timeline</h4>
                <div className="timeline-container">
                  {buildAttackTimeline(selectedEndpoint, alerts, responseActions).map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-marker" data-type={item.type}>
                        <span className="timeline-icon">{item.icon}</span>
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <span className="timeline-time">{item.time}</span>
                          {item.severity && (
                            <span className={`timeline-severity severity-${item.severity.toLowerCase()}`}>
                              {item.severity}
                            </span>
                          )}
                        </div>
                        <div className="timeline-event">{item.event}</div>
                        {item.description && (
                          <div className="timeline-description">{item.description}</div>
                        )}
                        {item.status && (
                          <div className="timeline-status">Status: {item.status}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="recent-events">
              <h4>Recent Events</h4>
              <ul>
                {selectedEndpoint.recentEvents.map((event, idx) => (
                  <li key={idx}>{event}</li>
                ))}
              </ul>
            </div>

            <div className="endpoint-actions">
              <button 
                className="btn-isolate"
                onClick={handleIsolate}
                disabled={selectedEndpoint.status === 'Isolated'}
              >
                Isolate endpoint
              </button>
              <button 
                className="btn-rejoin"
                onClick={handleRejoin}
                disabled={selectedEndpoint.status !== 'Isolated'}
              >
                Rejoin network
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default EndpointsPage
