import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import endpointsData from '../data/endpoints.json'
import alertsData from '../data/alerts.json'
import { calculateRiskScore, getRiskBadgeClass } from '../utils/riskScore'
import './EndpointsPage.css'

const EndpointsPage = ({ detector }) => {
  const [endpoints, setEndpoints] = useState([])
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [alerts] = useState(alertsData)

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

  return (
    <div className="endpoints-page">
      <h1 className="page-title">Endpoints</h1>
      
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
            {endpoints.map(endpoint => {
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
