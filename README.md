# EcoStep 🌱 | Premium Carbon Footprint Tracker & Guide

EcoStep is a high-fidelity, interactive web application designed to help individuals analyze, monitor, and systematically reduce their daily carbon emissions. Featuring a modern dark-themed glassmorphism interface, interactive visual analytics, a gamified rewards system, and custom heuristic feedback, it drives meaningful adjustments toward a carbon-neutral lifestyle.

---

## ✨ Features

*   **Active Carbon Ring (Visual Gauge)**: An SVG circle progress gauge comparing total yearly emission projections against targets (e.g., Paris Agreement target of 2,000 kg CO2e/year). It shifts dynamically from green to orange/red as you exhaust your budget.
*   **Granular Activity Ledger**: Log travel mileage (supporting Gasoline, Diesel, Hybrid, and EV cars, as well as trains, buses, and flights), monthly utility invoices (electricity, natural gas, water), daily diet profiles (vegan, vegetarian, meat-heavy), and general material consumption.
*   **Quick-Add Templates**: One-click logging shortcuts for common occurrences, like your daily solo commute, eco-friendly carpools, or weekly recycling events.
*   **Green Guild Guide & Simulator**: Join gamified eco-challenges to earn Green Points (GP). Spend your earned points to virtually fund real-world carbon offset projects (like Amazon reforestation, Sahara solar arrays, or Patagonia wind farms) to directly decrease your net carbon footprint in real-time.
*   **Heuristic Advisor Insights**: An intelligent recommendations engine that identifies your highest-emitting lifestyle category based on current logs and gives actionable optimization advice.

---

## 🛠️ Technology Stack

*   **Frontend Framework**: React 18 (via Vite)
*   **Styling**: Pure CSS Modules with global HSL variables, glassmorphic layouts, and responsive media-queries.
*   **Icons**: Lucide React
*   **Font System**: Space Grotesk (headers) & Inter (body text) imported via Google Fonts.
*   **Data Persistence**: Browser `localStorage` sync.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (version 18 or above recommended)
*   npm (installed automatically with Node.js)

### Installation
1.  Clone or download the project files into your working directory.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Run Locally
To spin up the local development server on `http://localhost:3000`:
```bash
npm run dev
```

### Build for Production
To bundle and optimize static assets into the `dist` directory:
```bash
npm run build
```

---

## ☁️ Netlify Deployment

This project includes a [netlify.toml](netlify.toml) file pre-configured for static Single Page Application hosting.

### Method 1: Continuous Deployment via GitHub (Recommended)
1. Push this directory to your personal GitHub repository.
2. Open your [Netlify Console](https://app.netlify.com/).
3. Click **Add new site** > **Import an existing project** and select your repository.
4. Netlify will configure Vite parameters automatically:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5. Click **Deploy Site**. Future GitHub pushes will trigger builds automatically.

### Method 2: Dashboard Drag-and-Drop
Run `npm run build` to generate the local `dist` folder. Drop that `dist` directory onto the [Netlify App Drop](https://app.netlify.com/drop) upload zone.
