export const DETECTORS = {
  LegacyAV: 'LegacyAV',
  CyberNexus: 'CyberNexus',
}

export const DETECTOR_LABELS = {
  [DETECTORS.LegacyAV]: 'Legacy AV (signature-based)',
  [DETECTORS.CyberNexus]: 'CyberNexus EDR (behavioral)',
}

export function isDetectableBy(alert, detector) {
  if (!alert) return false
  const list = alert.detectableBy
  if (!Array.isArray(list) || list.length === 0) return detector === DETECTORS.CyberNexus
  return list.includes(detector)
}

