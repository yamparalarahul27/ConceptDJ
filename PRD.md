---
description: Optimized phase-wise plan to turn the project into a high-performance crypto trading UI without any backend and only with hardcoded data calculation logics.
---

# CDJ Release Plan

## Strategic Goals
1.  **Structure & Routing:** Move landing pages to `src/app/welcome` and establish `src/app/playground` as the authenticated app root.
2.  **Alpha-Level Analytics:** Ship "Trader-First" metrics (MAE/MFE, Missed Gains, Tilt Analysis) rather than generic charts.
3.  **AI Integration:** Use AI Nudges for behavioral coaching (Psychology), not just data summary.

## Technical Assumptions & Stack
-   **Framework:** Next.js App Router (`src/app`).
-   **State:** Wallet Context (MultiWallet), Filter Context (Global Date/Pair state).
-   **Precision:** Use `decimal.js` or `bignumber.js` for all P&L math (critical for accuracy).
-   **Persistence:** `localStorage` used to save user's custom widget layouts.

---

## Phases & Milestones

### Phase 1 — Foundation & The "Playground" Engine
*Goal: Establish the new folder structure*

* **Restructure:**
    * Move current `src/app/page.tsx` to `src/app/welcome/page.tsx`.
    * Create authenticated root layout at `src/app/playground/layout.tsx` (Shared Header, Footer, Status Strip).
* **Core Components:**
    * **MultiWalletSelector:** Build slot in header; ensure context flows down.
    * **System Status Strip:** Real-time latency (ping), Gas Price ticker, API Health.
* **Placeholder Routes:**
    * Create route shells: `pnl-tracker`, `performance-analytics`, `journal`, `liquidity`, `settings`.

### Phase 2 — The P&L Engine & Execution Quality
*Goal: Move beyond simple "Profit" charts to "Execution Efficiency" (The "Pro" factor).*

* **Page: `pro-pnl-tracker`**
* **Key Widgets:**
    * **PnL Card & Chart:** Standard net profit over time.
    * **Paper Hands Tracker (Ghost Equity):** Overlay "Actual P&L" vs. "HODL Strategy" (What if I never sold?). 
    * **Execution Quality (MAE/MFE):** Scatter plot showing Maximum Adverse Excursion (Drawdown during trade) vs. Favorable Excursion (Max potential profit).
    with info icon, with content "MAE is the deepest "dip" below your start point—it shows how much "scary" red you saw. MFE is the highest "peak"—it shows the most money you could have made if you sold at the very top."
        * *Insight:* "You enter well but exit too early."
    * **PnL Heatmap:** Calendar view (Green/Red days intensity).
* **Data Layer:**
    * Wire Filters (Date, Pairs, Wallets) to these widgets.
    * Hardcoded data for MAE/MFE calculations.

### Phase 3 — Unified Performance Analytics (Spot + Futures)
*Goal: Consolidate Spot and Futures into a single "Deep Dive" view to reduce code duplication.*

* **Page: `pro-performance`** (Merges old Spot/Futures/Time plans) and have a toggle to switch between Spot and Futures.
* **Key Widgets:**
    * **Directional Bias Radar:** Win rate/Expectancy on Longs vs. Shorts.
    * **Time-Based Performance:** Hour-of-day / Day-of-week heatmaps.
    * **Funding & Fees Manager:**
        * **Funding Heatmap:** Visualizing funding rate spikes against position holds.
        * **Fee Impact Card:** "You paid $400 in fees to make $410 profit."
    * **Risk Analyser (Radar Chart):** Axes for Drawdown, Win Rate, Risk-Reward, Variance, Slippage, Latency.
* **Logic:**
    * Add "Asset Class" toggle (Spot vs. Futures) to filter the data feeding these widgets.

### Phase 4 — The Intelligent Trader (Journal & Psychology)
*Goal: Focus on the trader's mind. Why did they take the trade?*

* **Page: `pro-journal`**
* **Key Widgets:**
    * **The Tilt Meter (AI):** A gauge that increases if trade frequency spikes after a loss. (AI Nudge: "Slow down, high risk of tilt detected").
    * **Annotation Modal:** Chart snapshots with entry/exit markers + Rich Text notes.
    * **Strategy Tagger:** Dropdown to tag trades (e.g., "Breakout", "Mean Reversion") -> generates a "Strategy Breakdown" card showing which strategy pays the bills.
    * **AI Chat Assistant:** "Find all trades where I violated my stop loss rule."

### Phase 5 — Liquidity & Ecosystem Benchmarks
*Goal: Contextualize performance against the broader market.*

* **Page: `liquidity-analyser`**
* **Key Widgets:**
    * **Liquidity Depth Overlay:** Visualizing if user sold into support or resistance.
    * **Impermanent Loss Calculator:** For LP positions.
* **Global Benchmarking:**
    * Compare User Equity Curve vs. BTC Holding vs. ETH Holding vs. S&P 500.

### Phase 6 — Polish & Persistence
* **Settings:** Save widget layout preferences to local storage/DB.
* **Mobile Responsiveness:** Ensure complex charts (MAE/MFE) degrade gracefully on mobile.
* **Onboarding:** "Tour" mode highlighting the Pro features (Ghost Equity, Tilt Meter).

---

## Workstreams & Dependencies

| Workstream | Key Tasks |
| :--- | :--- |
| **UI/UX** | Grid Layout, Max use of components and css present in the file, "Tilt Meter" visual design, MAE/MFE Scatter plots. other needed will be planned and created as we go. |
| **Data/Math** | Hardcode MAE/MFE calculation logic ( Hard code OHLC data for trade duration), Funding rate historical fetchers. |
| **Components** | `Recharts` implementation for Scatter/Radar charts, `TableUI` virtualization. |
| **State** | Global Filter Store (Zustand/Context), Layout persistence logic. |

## Risks & Mitigations

* **Risk:** **Heavy Data Load.** Calculating MAE/MFE requires OHLC data for every minute the trade was open, so hardcode data for the UI only but have comment on requirments when user want to get it wired to backend.

## Definition of Done (Per Phase)
1.  **Routed & Linked:** Page exists in the `playground` layout.
2.  **Data Wired:** Filters (Date/Wallet) update the charts doesn't need to be acurate as these are loaded with hard coded data
3.  **AI Integration:** The AI Nudge component provides at least one specific insight based on the page data.
