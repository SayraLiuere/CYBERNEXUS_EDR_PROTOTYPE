import React from 'react'
import './SeverityBadge.css'

const SeverityBadge = ({ severity }) => {
  const getSeverityClass = (severity) => {
    const lower = severity.toLowerCase()
    if (lower === 'high') return 'high'
    if (lower === 'medium') return 'medium'
    if (lower === 'low') return 'low'
    return 'default'
  }

  return (
    <span className={`severity-badge ${getSeverityClass(severity)}`}>
      {severity}
    </span>
  )
}

export default SeverityBadge
