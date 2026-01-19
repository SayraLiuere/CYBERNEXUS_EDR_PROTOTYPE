/**
 * Calculate risk score for an endpoint based on:
 * - Number of high/medium alerts
 * - Current status
 * - Whether it's a critical asset
 * - Recent threat activity
 */
export const calculateRiskScore = (endpoint, alerts = []) => {
  let score = 0

  // Base score from status
  if (endpoint.status === 'Under attack') {
    score += 60
  } else if (endpoint.status === 'Isolated') {
    score += 40
  } else if (endpoint.status === 'Healthy') {
    score += 10
  }

  // Add points for alerts affecting this endpoint
  const endpointAlerts = alerts.filter(
    (a) => a.endpointId === endpoint.id || a.endpoint === endpoint.name
  )

  endpointAlerts.forEach((alert) => {
    if (alert.status === 'Open') {
      if (alert.severity === 'High') {
        score += 25
      } else if (alert.severity === 'Medium') {
        score += 15
      } else if (alert.severity === 'Low') {
        score += 5
      }
    }
  })

  // Critical assets get base risk boost
  if (endpoint.tags && endpoint.tags.includes('Critical asset')) {
    score += 10
  }

  // Cap at 100
  return Math.min(100, Math.max(0, score))
}

export const getRiskLevel = (score) => {
  if (score >= 70) return { level: 'Critical', color: '#ef4444' }
  if (score >= 50) return { level: 'High', color: '#f59e0b' }
  if (score >= 30) return { level: 'Medium', color: '#eab308' }
  return { level: 'Low', color: '#22c55e' }
}

export const getRiskBadgeClass = (score) => {
  if (score >= 70) return 'risk-critical'
  if (score >= 50) return 'risk-high'
  if (score >= 30) return 'risk-medium'
  return 'risk-low'
}
