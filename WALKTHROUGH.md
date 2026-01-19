# CyberNexus EDR – Walkthrough (Updated)

## Overview
- UI-first EDR prototype with detector switch (Legacy AV vs CyberNexus EDR) to show behavioral detections.
- Pages: Dashboard, Endpoints, Alerts, Reports, Automated Response.
- Dark SOC-style UI; all data is static JSON; state is in-memory (no backend).

## Navigation & Layout
- Top bar: brand + nav (Dashboard, Endpoints, Alerts, Reports, Response) + Detector selector.
- Hash-based routing for GitHub Pages.
- Sticky navbar; dark glassmorphism styling.

## Pages & Interactions

### Dashboard
- Summary cards: protected endpoints, open alerts, ransomware blocked, avg CPU.
- Recent alerts list with “View alert”.
- Detector diff callout: shows extra threats CyberNexus sees vs Legacy AV.
- Sidebar quick stats: Pilot count, Critical assets.

### Endpoints
- Filters: Phase (All/Pilot/Critical/Full deployment) and Status (All/Healthy/Under attack/Isolated).
- Columns: Name, Dept, Phase badge, **Risk Score**, Status badge, CPU%, RAM%.
- Row click → detail modal:
  - Risk score badge, status, CPU/RAM, tags.
  - Health mini-chart (CPU sparkline, last 6 checks).
  - **Attack timeline** (if Under attack): detection → alerts → response actions, color-coded markers.
  - Recent events list.
  - Actions: Isolate / Rejoin (stateful in UI).

### Alerts & Response
- Filters: All | High | Medium | Low.
- Detector diff callouts: Legacy AV misses X; CyberNexus surfaces Y more.
- Actions per open alert: Auto-recover, Isolate, False positive (adds to tuning log).
- Tuning log shows false-positive markings.
- **Analyst Notes side panel** (click a row): summary + textarea, auto-saves (localStorage).

### Automated Response
- Stats: Total actions, Today, Successful, High severity.
- Timeline of automated actions (auto-recovery, isolation, process kill, quarantine, login block, dismiss FP, behavioral analysis) with severity/status.

### Reports
- SIEM/SOAR events (sample list).
- PDPA compliance modal: data collection, retention, access control, subject rights, timestamp.

## Detector Switch (Storytelling)
- Legacy AV view hides behavior-only detections (e.g., ransomware behavior, unusual login).
- CyberNexus view reveals additional threats; callouts on Dashboard/Alerts highlight the delta.

## Data Files (src/data)
- endpoints.json — endpoints, phases, status, events.
- alerts.json — alerts with detectableBy array for detector demo.
- responseActions.json — automated actions for response timeline.
- siemEvents.json — events for Reports page.

## What’s Simulated
- All data is static JSON; actions update UI state only (not persisted).
- Notes stored in localStorage.
- No real agent, network, or SIEM calls.

## Deploy
- GitHub Pages via Actions; HashRouter; base `/CYBERNEXUS_EDR_PROTOTYPE/`.
- Live: https://sayraliuere.github.io/CYBERNEXUS_EDR_PROTOTYPE/
