# Deriverse

## Live Apps
- Main app: [https://conceptdj.vercel.app](https://conceptdj.vercel.app)
- Demo Video: [https://youtu.be/odKifzz8NbI](https://youtu.be/odKifzz8NbI)
- Main Screens PDF Doc: [https://drive.google.com/file/d/1rKDJrtJwz-4fTcpLxoxOmnGv8XXFQblV/view?usp=drive_link](https://drive.google.com/file/d/1rKDJrtJwz-4fTcpLxoxOmnGv8XXFQblV/view?usp=drive_link)
  
## Overview
Concept Deriverse is a UI only trading analytics and journal experience for Solana Dex Traders.

## Credits
- Designed & Engineered by **Yamparala Rahul**
- Telegram / X: **@yamparalarahul1**
- Made for Superteam Earn bounty: [Design trading analytics dashboard with journal and portfolio analysis](https://superteam.fun/earn/listing/design-trading-analytics-dashboard-with-journal-and-portfolio-analysis)

## Features
- 20+ analytical cards/widgets across performance, psychology, market depth, and utilities: Paper Hands Tracker, AI Tilt Meter, PnL & Funding Heatmaps, Risk Radar, Execution Quality, Asset Benchmark, Liquidity Heatmap, Orderbook Depth, Portfolio Performance & Fragility, Direction Bias, Market Volatility, Behavioral Log, TradingView Chart, and more premium UI components (CardWithCornerShine, GlassmorphismNavbar, LivePulseIndicator)
- Experiments with sound and design

## Tech Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn styles
- Charts: Recharts, visx, and lightweight-charts
- Animation: Motion (Framer Motion)

> **Note:** This is a UI-only concept. There is no live backend today — the
> Supabase, Helius, and Deriverse services under `src/services/` are mocks that
> return static/empty data, and annotations persist to browser `localStorage`.
> Solana Web3, Helius, and Supabase persistence are planned integrations, not
> yet wired up.

## Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Scripts
- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run lint` — lint codebase

## Documentation
- `Documents/architecture.md` — system overview
- `Documents/design_uiux.md` — UI patterns and tokens
- `Documents/Database.md` — planned Supabase schemas and caching
- `Documents/Process.md` — workflow and agent skills
- `Documents/Testing.md` — testing strategy
- `Documents/Deployment.md` — deployment notes

