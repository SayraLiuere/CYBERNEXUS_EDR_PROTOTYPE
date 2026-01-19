/**
 * Build attack timeline from endpoint events and alerts
 */
export const buildAttackTimeline = (endpoint, alerts = [], responseActions = []) => {
  const timeline = []
  
  // Get alerts for this endpoint
  const endpointAlerts = alerts.filter(
    a => a.endpointId === endpoint.id || a.endpoint === endpoint.name
  )
  
  // Get response actions for this endpoint
  const endpointActions = responseActions.filter(
    a => a.endpoint === endpoint.name
  )
  
  // Parse recent events from endpoint
  endpoint.recentEvents?.forEach(event => {
    const match = event.match(/(.+?)\s*-\s*(\d{2}:\d{2})/)
    if (match) {
      timeline.push({
        time: match[2],
        event: match[1],
        type: 'detection',
        icon: '🔍'
      })
    }
  })
  
  // Add alerts
  endpointAlerts.forEach(alert => {
    timeline.push({
      time: alert.time,
      event: `${alert.type} detected`,
      type: 'alert',
      severity: alert.severity,
      icon: alert.severity === 'High' ? '⚠️' : '📋',
      status: alert.status
    })
  })
  
  // Add response actions
  endpointActions.forEach(action => {
    timeline.push({
      time: action.timestamp,
      event: action.action,
      type: 'response',
      icon: action.icon,
      description: action.description,
      status: action.status
    })
  })
  
  // Sort by time (newest first, then reverse for chronological display)
  timeline.sort((a, b) => {
    const timeA = a.time.split(':').map(Number)
    const timeB = b.time.split(':').map(Number)
    const totalA = timeA[0] * 60 + timeA[1]
    const totalB = timeB[0] * 60 + timeB[1]
    return totalA - totalB
  })
  
  return timeline
}
