# EYYSAT CITY: Student Life Survival Simulator

EYYSAT CITY is an interactive, premium frontend-only student life simulator built with React, TypeScript, and Tailwind CSS. It allows users to choose a student type, make school-life decisions from Monday to Friday, track live stats, experience random events, and receive a final student profile based on their choices.

---

## 🚀 Tech Stack

- **Framework**: React 19 with Vite
- **Language**: TypeScript (strict-typed data schemas)
- **Styling**: Tailwind CSS (with custom cybernetic neon classes, glassmorphism, glowing micro-bars, and animations)
- **Animations**: Framer Motion / Motion for React for smooth screen transitions and stat counters
- **Icons**: Lucide React
- **Audio Output**: Web Audio API (Synthesized click, success, alert, and victory chime sequences)

---

## ⚡ How to Run Locally

You can launch and explore EYYSAT CITY locally in under a minute with these steps:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Launch the development server**:
   ```bash
   npm run dev
   ```
3. **Open the browser**:
   Click on the local URL provided (usually `http://localhost:3000`).

---

## 🎓 Core Functions to Explain During Presentations

This simulator is powered by **10 core functional blocks**, designed to demonstrate clean architectural modularity (separated into static scenario structures, calculation frameworks, sound systems, and storage caches):

1. **Start Simulation Function**: Transition module that routes users from the cinematic background landing deck directly into the story experience.
2. **Student Type Selection Function**: Instantiates the state machine by assigning initial weights (Scholar, Crammer, Hustler, Chill, Leader) to the six core metrics.
3. **Scenario Display Function**: Retrieves and renders raw JSON day scenarios, displaying current student location tags, dilemmas, and option maps.
4. **Choice Selection Function**: Accepts decisions, locks daily selections, clamps value results, and triggers UI consequences.
5. **Stat Update Function**: Core telemetry arithmetic that calculates new values for Energy, Stress, Grades, Money, Focus, and Social metrics, clamped safely between `0` and `100`.
6. **Consequence Feedback Function**: Dispatches localized prose explanations illustrating the aftermath of actions alongside color-coded statistical deltas (glowing green/red).
7. **Random Event Function**: A stochastic engine executing a 60% probability check between days to simulate unexpected campus circumstances (e.g. Traffic Delays, Notes shared, sleeping badly).
8. **Progress Tracker Function**: Animates a visual path mapping Monday to Friday indicating current temporal coordinates and completed checkpoints.
9. **Final Result Function**: Runs weighted priority checks on week-ending stats (like burnout thresholds or academic ratios), then falls back to overall scores to assign a distinctive final student archetype.
10. **Restart Function**: Resets active triggers to initial states, clears state structures, and routes users back to Selectors for instant replayability.

---

## 🎨 Design Accomplishments

- **Immersive Cyber Starfield**: Background of drifting CSS particle elements, laser vectors, glowing nebulas, and pulsing wireframe canvas floors.
- **Micro-diagnostic LEDs**: Stat bars that blink warning alerts when stress breaches critically high limits or cellular energy runs low.
- **Responsive Screen Hub**: Flexible flex-boxes and bento grids rendering gracefully across all viewport scales from mobile to widescreen monitors with large touch targets.
- **Glassmorphic Deck Controls**: Futuristic transparent glass panel cards, glow halos, and interactive hover scales.
