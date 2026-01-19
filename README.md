# CyberNexus EDR Prototype

A lightweight web application prototype for an Endpoint Detection and Response (EDR) system.

## Features

- **Dashboard**: Overview with summary cards and recent alerts
- **Endpoints**: Table view with endpoint details, isolation, and rejoin functionality
- **Alerts & Response**: Filterable alerts with auto-recovery, isolation, and false positive handling
- **Reports**: SIEM/SOAR integration view and PDPA compliance report generation

## Tech Stack

- React 18
- React Router DOM
- Vite
- HTML/CSS/JavaScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5174`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── components/      # Shared components (NavBar, StatCard, Modal, etc.)
│   ├── pages/          # Page components (Dashboard, Endpoints, Alerts, Reports)
│   ├── data/           # Static JSON data files
│   ├── App.jsx         # Main app component with routing
│   └── main.jsx        # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Features Overview

### Dashboard
- Four summary cards showing protected endpoints, open alerts, ransomware blocked, and average CPU usage
- Recent alerts list with quick navigation to alert details

### Endpoints
- Table view of all endpoints with filtering by phase and status
- Click any row to view detailed endpoint information
- Isolate/Rejoin network functionality
- Recent events tracking

### Alerts & Response
- Filter alerts by severity (All, High, Medium, Low)
- Auto-recover: Restore files from snapshot
- Isolate: Isolate endpoint from network
- False positive: Mark alert as false positive (adds to tuning log)

### Reports
- SIEM/SOAR integration: View events sent to SIEM in last 24 hours
- PDPA Compliance Report: Generate detailed compliance report

## Data

All data is stored in static JSON files in `src/data/`:
- `endpoints.json`: Endpoint information
- `alerts.json`: Alert data
- `siemEvents.json`: SIEM integration events

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment.

### Automatic Deployment

The repository includes a GitHub Actions workflow that automatically builds and deploys the site when you push to the `main` branch.

### Manual Setup (if needed)

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically build and deploy your site

### Live Site

Once deployed, your site will be available at:
`https://sayraliuere.github.io/CYBERNEXUS_EDR_PROTOTYPE/`

## Notes

This is a prototype application with static data. All actions update the UI state only and do not persist between page refreshes.
