# CyberNexus EDR - Complete Walkthrough & Feature Guide

## 📋 Table of Contents
1. [Application Overview](#application-overview)
2. [Navigation & Layout](#navigation--layout)
3. [Page-by-Page Breakdown](#page-by-page-breakdown)
4. [Working Features](#working-features)
5. [Data Structure](#data-structure)
6. [What's Simulated vs Real](#whats-simulated-vs-real)

---

## Application Overview

**CyberNexus EDR** is a prototype Endpoint Detection and Response (EDR) system web application. It demonstrates:
- Real-time endpoint monitoring
- Security alert management
- Incident response workflows
- SIEM integration visualization
- PDPA compliance reporting

**Tech Stack:** React 18, React Router, Vite, Static JSON Data

---

## Navigation & Layout

### Top Navigation Bar
- **Logo:** "🛡️ CyberNexus EDR" with gradient styling
- **Navigation Links:**
  - Dashboard (Home)
  - Endpoints
  - Alerts
  - Reports
- **Active State:** Current page highlighted with gradient background
- **Sticky:** Navigation bar stays at top when scrolling

### Optional Sidebar (Dashboard only)
- **Location:** Right side of Dashboard page
- **Content:** Quick stats showing:
  - Pilot phase endpoints count
  - Critical assets count
- **Responsive:** Stacks below main content on smaller screens

---

## Page-by-Page Breakdown

### 🏠 Page 1: Dashboard

#### Summary Cards (Top Section)
Four metric cards displaying:

1. **Protected endpoints: 12**
   - Counts total endpoints from data
   - Icon: 🖥️
   - **Status:** ✅ Working - Dynamically calculated

2. **Open alerts: 3**
   - Counts alerts with status "Open"
   - Icon: ⚠️
   - **Status:** ✅ Working - Filters and counts in real-time

3. **Ransomware blocked (this week): 2**
   - Counts alerts containing "Ransomware" in type
   - Icon: 🛡️
   - **Status:** ✅ Working - Filters alert types

4. **Avg CPU usage by agent: 0.7%**
   - Calculates average CPU usage across all endpoints
   - Icon: 📊
   - **Status:** ✅ Working - Calculates from endpoint data
   - **Note:** Shows the 1% CPU limit concept (all endpoints are under 1%)

#### Recent Alerts Section
- **Displays:** Top 5 open alerts
- **Each Alert Shows:**
  - Severity badge (High/Medium/Low with color coding)
  - Alert type and endpoint name
  - "View alert" button
- **"View alert" Button:**
  - ✅ **Working** - Navigates to Alerts page
  - Passes alert ID as URL parameter

#### Quick Stats Sidebar
- **Pilot phase:** Counts endpoints with phase "Pilot"
- **Critical assets:** Counts endpoints with "Critical asset" tag
- **Status:** ✅ Working - Dynamically calculated

---

### 🖥️ Page 2: Endpoints

#### Endpoints Table
**Columns:**
- Name (e.g., FIN-PC-01, HR-LAPTOP-02)
- Department (Finance, HR, IT)
- Phase (Pilot / Critical / Full deployment)
  - Color-coded badges:
    - Pilot: Blue
    - Critical: Pink
    - Full deployment: Green
- Status (Healthy / Under attack / Isolated)
  - Color-coded badges:
    - Healthy: Green
    - Under attack: Red
    - Isolated: Orange
- CPU Usage (%)
- RAM Usage (%)

**Table Features:**
- ✅ **Clickable Rows** - Click any row to open detail modal
- ✅ **Hover Effect** - Rows highlight on hover
- ✅ **Responsive Design** - Adapts to screen size

#### Endpoint Detail Modal
**Opens when:** Clicking any table row

**Shows:**
1. **Endpoint Header:**
   - Endpoint name (e.g., "FIN-PC-01")
   - Tags (e.g., "Critical asset", "Phase 2")

2. **Endpoint Information:**
   - Department
   - Phase (with badge)
   - Status (with badge)
   - CPU Usage
   - RAM Usage

3. **Recent Events List:**
   - Last 5 behaviors/events detected
   - Example: "Ransomware behavior detected - 10:21"

4. **Action Buttons:**
   - **"Isolate endpoint"** ✅ **Working**
     - Changes endpoint status to "Isolated"
     - Updates table immediately
     - Button disables when already isolated
     - Status badge turns orange
   
   - **"Rejoin network"** ✅ **Working**
     - Changes endpoint status to "Healthy"
     - Updates table immediately
     - Button disables when not isolated
     - Status badge turns green

**Modal Features:**
- ✅ Click outside to close
- ✅ Close button (×) in header
- ✅ Smooth animations

---

### ⚠️ Page 3: Alerts & Response

#### Filter Buttons
**Options:** All | High | Medium | Low
- ✅ **Working** - Filters alerts by severity
- Active filter highlighted with gradient
- Updates table in real-time

#### Alerts Table
**Columns:**
- Time (e.g., 10:21)
- Endpoint (clickable name)
- Severity (color-coded badge)
- Type (e.g., "Ransomware behavior")
- Status (Open / Resolved / Closed – False positive)
- Actions (buttons based on status)

#### Action Buttons (for Open alerts)

1. **"Auto-recover"** ✅ **Working**
   - **What happens:**
     - Shows confirmation message: "Files restored from snapshot, user notified."
     - After 2 seconds, alert status changes to "Resolved"
     - Alert shows "✓ Auto-recovered" badge
     - Simulates ransomware recovery workflow
   - **Visual Feedback:** Green confirmation banner appears

2. **"Isolate"** ✅ **Working**
   - **What happens:**
     - Alert status remains "Open"
     - Alert shows "• Endpoint isolated" tag
     - Simulates network isolation action
   - **Note:** This updates the alert UI only (doesn't sync with Endpoints page in this prototype)

3. **"False positive"** ✅ **Working**
   - **What happens:**
     - Alert status changes to "Closed – False positive"
     - Entry added to "Tuning Log" section below
     - Log entry shows: timestamp, endpoint, type, and "Marked as false positive"
   - **Purpose:** Demonstrates false positive handling and tuning

#### Tuning Log Section
- **Appears when:** At least one alert marked as false positive
- **Shows:**
  - Timestamp of marking
  - Endpoint name
  - Alert type
  - "Marked as false positive" message
- ✅ **Working** - Logs accumulate as you mark more false positives

#### Alert Status Indicators
- **Open:** Red text
- **Resolved:** Green text
- **Closed:** Gray text

---

### 📊 Page 4: Integration & Reports

#### SIEM/SOAR Integration Section
**Card Title:** "Events sent to SIEM (last 24h)"

**Features:**
- Event count badge (shows number of events)
- List of events with:
  - Endpoint name
  - Event type (e.g., "Ransomware blocked")
  - Timestamp
  - "Sent via API" indicator

**Current Data:** 4 sample events
- ✅ **Working** - Displays static data from `siemEvents.json`
- **Note:** In production, this would connect to real SIEM API

#### PDPA/Compliance Report Section
**Button:** "Generate PDPA Compliance Report"
- ✅ **Working** - Opens modal when clicked

**Modal Content:**
1. **Data Collection Section:**
   - Lists data types collected:
     - Telemetry Data
     - Security Logs
     - Endpoint Information
     - Alert Data

2. **Data Retention Section:**
   - Forensic Search Window: 30 days
   - Alert History: 90 days
   - Endpoint Telemetry: 7-day rolling window
   - SIEM Integration Logs: 1 year

3. **Access Control & Audit Section:**
   - Role-Based Access
   - Audit Logging
   - Data Minimization
   - Encryption policies

4. **Data Subject Rights Section:**
   - Access rights
   - Correction rights
   - Deletion rights
   - Breach notification

5. **Report Footer:**
   - Report generation timestamp (dynamic)
   - System version

**Modal Features:**
- ✅ Click outside to close
- ✅ Close button (×)
- ✅ Scrollable content
- ✅ Professional formatting

---

## Working Features

### ✅ Fully Functional Features

1. **Navigation:**
   - Page routing between all 4 pages
   - Active page highlighting
   - URL-based navigation

2. **Dashboard:**
   - Real-time metric calculations
   - Dynamic alert list
   - Navigation to alerts page
   - Sidebar stats calculation

3. **Endpoints:**
   - Table display with all data
   - Row click to open modal
   - Status badge color coding
   - Phase badge color coding
   - **Isolate endpoint** - Updates status in real-time
   - **Rejoin network** - Updates status in real-time
   - Modal open/close functionality

4. **Alerts:**
   - Severity filtering (All/High/Medium/Low)
   - **Auto-recover** - Shows confirmation, updates status
   - **Isolate** - Adds isolation tag to alert
   - **False positive** - Updates status, adds to tuning log
   - Tuning log display (appears when entries exist)
   - Status color coding

5. **Reports:**
   - SIEM events display
   - PDPA report modal generation
   - Dynamic timestamp in report

6. **UI/UX:**
   - Responsive design
   - Hover effects
   - Smooth animations
   - Color-coded status indicators
   - Modal overlays
   - Button states (disabled when appropriate)

---

## Data Structure

### Static JSON Files

#### `src/data/endpoints.json`
**12 endpoints** with:
- id, name, department, phase, status
- cpuUsage, ramUsage (percentages)
- tags (array)
- recentEvents (array of strings)

**Sample Endpoints:**
- FIN-PC-01 (Finance, Critical, Under attack)
- HR-LAPTOP-02 (HR, Pilot, Healthy)
- IT-SERVER-01 (IT, Full deployment, Healthy)
- HR-LAPTOP-01 (HR, Pilot, Isolated)

#### `src/data/alerts.json`
**5 alerts** with:
- id, time, endpoint, severity, type, status
- endpointId (links to endpoint)
- Optional: endpointIsolated, autoRecovered flags

**Sample Alerts:**
- High severity ransomware on FIN-PC-01 (Open)
- Medium unusual login on HR-LAPTOP-02 (Open)
- High suspicious activity on HR-LAPTOP-01 (Resolved, Isolated)
- Low configuration change (Closed - False positive)
- High file encryption (Resolved, Auto-recovered)

#### `src/data/siemEvents.json`
**4 SIEM events** with:
- id, endpoint, event, timestamp, sentVia

---

## What's Simulated vs Real

### ✅ Simulated (UI State Only)

1. **All Data Updates:**
   - Endpoint status changes (Isolate/Rejoin)
   - Alert status changes (Auto-recover, False positive)
   - Tuning log entries
   - **Note:** Changes are lost on page refresh

2. **No Backend:**
   - No API calls
   - No database persistence
   - No real-time data streaming
   - No actual endpoint communication

3. **No Real Actions:**
   - Isolation doesn't actually isolate endpoints
   - Auto-recover doesn't restore real files
   - SIEM events aren't actually sent
   - No real agent communication

### ✅ Real (Functional)

1. **UI Interactions:**
   - All buttons work
   - Modals open/close
   - Navigation works
   - Filters work
   - State updates in real-time

2. **Calculations:**
   - Metric calculations are real
   - Averages are calculated correctly
   - Counts are accurate

3. **Visual Feedback:**
   - Status changes reflect immediately
   - Color coding works
   - Animations work
   - Responsive design works

---

## Key Interactions to Try

1. **Dashboard → Alerts:**
   - Click "View alert" on any alert
   - See it navigate to Alerts page

2. **Endpoints → Isolation:**
   - Click any endpoint row
   - Click "Isolate endpoint"
   - See status change to "Isolated" (orange)
   - Click "Rejoin network"
   - See status change to "Healthy" (green)

3. **Alerts → Auto-recover:**
   - Click "Auto-recover" on an open alert
   - See confirmation message
   - Watch status change to "Resolved" after 2 seconds

4. **Alerts → False Positive:**
   - Click "False positive" on an open alert
   - See status change to "Closed – False positive"
   - Scroll down to see entry in Tuning Log

5. **Alerts → Filtering:**
   - Click "High" filter
   - See only high severity alerts
   - Click "All" to see all alerts

6. **Reports → PDPA:**
   - Click "Generate PDPA Compliance Report"
   - Read through the comprehensive report
   - Notice dynamic timestamp

---

## Limitations & Notes

1. **No Persistence:**
   - All changes reset on page refresh
   - Data is loaded from static JSON files

2. **No Cross-Page Sync:**
   - Isolating an endpoint in Alerts page doesn't update Endpoints page
   - Each page manages its own state

3. **Static Data:**
   - Endpoint metrics don't change over time
   - Alerts don't update automatically
   - No real-time monitoring

4. **Prototype Purpose:**
   - Demonstrates UI/UX and workflows
   - Shows EDR concepts visually
   - Not a production system

---

## Summary

This is a **fully functional UI prototype** that demonstrates:
- ✅ Complete navigation system
- ✅ Interactive endpoint management
- ✅ Alert response workflows
- ✅ Compliance reporting
- ✅ Modern, responsive design

All UI interactions work perfectly, but data is static and changes don't persist. Perfect for demonstrating EDR concepts and workflows!
