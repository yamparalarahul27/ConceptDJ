---
description: Phase-wise plan to turn the project into a playground with new pro screens and widgets
---

# Playground Release Plan

## Goals
- Convert landing/Welcome screen and `src/app/page.tsx` into a separate folder to clarify new playground pages.
- Ship new pro screens with advanced analytics, filters, AI assistance, and system status strips.
- Add new widgets (AI Nudge summaries, custom screens, benchmarks, risk metrics, strategy breakdown, capital flows, etc.).
- Maintain cohesion with existing components and data/filter flows.

## Assumptions
- Next.js app router in `src/app`.
- Existing components under `src/components/features` and `src/components/ui` reused where possible.
- Filters use existing `FILTERS`, `dateRange`, pair selectors; MultiWalletSelector exists or will be built.
- Data layer and APIs may need stubs/mocks for new widgets; iterate with placeholder data first.

## Phases & Milestones

### Phase 1 — Project Restructure & Baseline
- Move Welcome screen + current `src/app/page.tsx` into a dedicated folder (e.g., `src/app/welcome/page.tsx`) and wire redirect/root routing as desired.
- Set up playground index page that links to all new pro screens.
- Add shared layout pieces: header with MultiWalletSelector slot, footer/system status strip (latency/ping), and AI Nudge summary area per page.
- Create placeholder pages for all requested routes to unblock navigation:
  - `pro-pnl-tracker`, `pro-trade-tracker`, `pro-time-based-performance-tracker`, `pro-spot-performance-tracker`, `pro-futures-performance-tracker`, `pro-fee-tracker`, `portfolio-analyser`, `pro-journal`, `liquidity-analyser`, `404`.
- Introduce shared widgets: AI Assistance chat (model selector), Market ticker strip, Market Volatility card scaffold, Order Efficiency card scaffold, RiskAnalyser scaffold (RadarChart), TradeCount scaffold, DirectionalBias scaffold, Equity Curve scaffold, StrategyTracking section, Strategy Breakdown card, Capital Flows card, Pnl Heatmap, Execution Quality card, AI Nudge summary component.

### Phase 2 — Data & Filters Integration (P&L focus)
- `pro-pnl-tracker` page:
  - Compose PnLCard, PnLChart, StatsRow items (winRate, avgWin, avgLoss), FILTERS/dateRange, pair selector, Apply button, MultiWalletSelector near title.
  - Add PnL Heatmap, Execution Quality card, TableUI (driven by filters), AI Nudge summary, system status strip.
- Define filter state shape (date range, pairs, sessions) and wire to data fetch hooks (mocked if needed).
- Build/plug MultiWalletSelector and ensure downstream components receive wallet context.
- Ensure TableUI columns align with filter outputs; add loading/empty states.

### Phase 3 — Trade Analytics Screens
- `pro-trade-tracker` page:
  - Add LargestTradesCard, LargestGainCard, LargestLossCard, tradingVolume widget, AverageTradeDurationCard.
  - Add TradeCount card and RiskAnalyser (RadarChart from Recharts) with axes for drawdown, win rate, RR, variance, slippage, latency.
  - Include filters (pairs/date/session if applicable), AI Nudge, system status strip.
- Hook data adapters for trade aggregates; mock until API ready.

### Phase 4 — Time & Spot Performance
- `pro-time-based-performance-tracker`:
  - Include TimeBasedPerformanceCard plus filters extended with daily + session-based options.
  - AI Nudge + status strip.
- `pro-spot-performance-tracker`:
  - OrderTypeRatioCard + new Order Efficiency card (fill rate metrics, partial fills, cancellations) and Market Volatility card.
  - Filters (spot pairs/date), AI Nudge, status strip, ticker strip.

### Phase 5 — Futures, Fees, Portfolio
- `pro-futures-performance-tracker`:
  - longShortRatio widget + DirectionalBias card.
  - Futures-specific filters (instrument, leverage tier), AI Nudge, status strip.
- `pro-fee-tracker`:
  - FeeDistribution + capital flows (Deposit/Withdrawal) breakdown.
  - Wallet selector integration.
- `portfolio-analyser`:
  - Equity Curve showing portfolio value vs 8% annual benchmark; include drawdown, Sortino Ratio, Expectancy Var.
  - AI Nudge + status strip.

### Phase 6 — Journal & Liquidity
- `pro-journal`:
  - AnnotationModal (with chart + entry/exit lines), JournalStreakCard, Journal, new StrategyTracking section, Strategy Breakdown card.
  - Add AI Assistance chat for note tagging; AI Nudge summary.
- `liquidity-analyser`:
  - LPing History timeline/table; include liquidity depth, fees earned, impermanent loss estimates.
  - Market ticker strip; AI Nudge; status strip.

### Phase 7 — Platform Polish & Settings
- 404 page with navigation back to playground index.
- Settings page for creating custom screens with widgets: drag/drop layout config, widget catalog (all new cards), persist to storage.
- Global components hardening: AI Assistance chat model chooser UX, system status strip (latency/ping/uptime), ticker strip theming.
- Performance and accessibility passes; responsive layouts for all pages.

## Workstreams & Dependencies
- **UI/UX:** Page shells, card composition, AI Nudge area, status strip, ticker strip.
- **Data:** APIs or mocks for PnL, trades, futures, fees, portfolio, liquidity; filter/query contracts.
- **Charts:** Recharts for RadarChart (RiskAnalyser), equity curves, heatmaps.
- **State:** Shared filter/date/session context; wallet context; settings for custom screens.
- **Infra:** Routing and folder restructure; error boundary/404; loading states.

## Risks & Mitigations
- Data availability: start with mocked adapters; define interfaces early.
- Layout complexity: create shared page template with header (title + MultiWalletSelector + filters + Apply), content grid, AI Nudge, footer strip.
- Performance: paginate TableUI; lazy-load heavy charts.
- Scope creep: lock widget list per phase; defer extras to later minor releases.

## Definition of Done (per screen)
- Routed page with responsive layout and shared header/footer.
- Filters + Apply propagate to all child widgets.
- AI Nudge summary populated (stub or real) from page data.
- System status/latency/ping strip visible.
- Empty/error/loading states covered.

## Release Packaging
- Ship phases sequentially; behind feature flags if needed.
- Provide demo data toggles for stakeholder reviews.
- Update README/playground index with page links and notes.
