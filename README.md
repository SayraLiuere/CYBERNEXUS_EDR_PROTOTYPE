# CyberNexus EDR Prototype

A lightweight, UI-first EDR prototype showing how CyberNexus EDR detects and responds versus a legacy AV.

## Key Features (what to demo)
- **Detector switch (Legacy AV vs CyberNexus EDR)** to show threats legacy AV misses.
- **Dashboard**: summary cards, recent alerts, detector diff callout, quick stats sidebar.
- **Endpoints**: phase/status filters, risk scores, isolation/rejoin, health mini-chart, attack timeline (for under-attack endpoints).
- **Alerts & Response**: severity filters, auto-recover / isolate / false-positive, tuning log, detector diff callout, **Analyst Notes side panel** (saved locally).
- **Automated Response**: timeline of automated actions (auto-recovery, isolation, process kill, quarantine, block login, behavioral analysis) with stats.
- **Reports**: SIEM events list and PDPA compliance modal.
- **Dark SOC-style UI** for readability.

## Tech Stack
- React 18
- React Router DOM
- Vite
- HTML/CSS/JavaScript

## Getting Started (Dev)
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
npm run dev
# open http://localhost:5174
```

### Build for Production
```bash
npm run build
```
Outputs to `dist/`.

## Project Structure
```
├── src/
│   ├── components/        # NavBar, StatCard, Modal, SeverityBadge, AlertSidePanel, etc.
│   ├── pages/             # Dashboard, Endpoints, Alerts, Reports, AutomatedResponse
│   ├── data/              # endpoints.json, alerts.json, responseActions.json, siemEvents.json
│   ├── utils/             # detectors, riskScore, attackTimeline helpers
│   ├── App.jsx            # Main app with routing + detector switch state
│   └── main.jsx           # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Feature Details

### Dashboard
- Summary cards (protected endpoints, open alerts, ransomware blocked, avg CPU)
- Recent alerts list with “View alert”
- Detector diff note (extra threats surfaced by CyberNexus)
- Quick stats sidebar (Pilot count, Critical assets)

### Endpoints
- Filters: Phase (All/Pilot/Critical/Full deployment) and Status (All/Healthy/Under attack/Isolated)
- Risk score per endpoint (Low/Medium/High/Critical)
- Click row → detail modal (isolate/rejoin, CPU/RAM, tags)
- Health mini-chart (CPU sparkline)
- Attack timeline (for “Under attack”): detection → alert → response actions
- Recent events list

### Alerts & Response
- Severity filters (All/High/Medium/Low)
- Actions: Auto-recover, Isolate, False positive (adds to tuning log)
- Detector diff callout (Legacy misses vs CyberNexus surfaces more)
- Analyst Notes side panel (click row): summary + saved notes (localStorage)

### Automated Response
- Timeline of automated actions (auto-recovery, isolation, process terminated, quarantine, block login, dismiss FP, behavioral analysis)
- Stats: total, today, successful, high severity

### Reports
- SIEM/SOAR integration: View events sent to SIEM in last 24 hours
- PDPA Compliance Report: Generate detailed compliance report

## Data
Static JSON in `src/data/`:
- `endpoints.json`: Endpoint information
- `alerts.json`: Alert data
- `responseActions.json`: Automated response actions
- `siemEvents.json`: SIEM integration events

## GitHub Pages Deployment
- HashRouter + `base: '/CYBERNEXUS_EDR_PROTOTYPE/'`
- GitHub Actions deploy workflow on push to `main`
- Live site: `https://sayraliuere.github.io/CYBERNEXUS_EDR_PROTOTYPE/`

## Notes
Prototype with static data. All actions update UI state only and do not persist across refresh.
