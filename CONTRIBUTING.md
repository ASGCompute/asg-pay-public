# Contributing to ASG Pay

Thank you for your interest in contributing to ASG Pay! This project is open-source infrastructure for cross-chain AI agent payments, built on Stellar with Wormhole interoperability.

## Architecture Overview

ASG Pay is a React SPA with three payment rails, all settling on Stellar:

```
┌──────────────────────────────────────────────────────────┐
│                      ASG Pay UI                           │
│              React 19 · TypeScript · Vite 8               │
├──────────────┬──────────────────┬────────────────────────┤
│  Bank & Card │  Bridge & Swap   │         Send           │
│  (Stripe)    │  (Wormhole)      │      (Stellar)         │
├──────────────┴──────────────────┴────────────────────────┤
│           Stellar Network (Settlement Layer)              │
└──────────────────────────────────────────────────────────┘
```

- **Bank & Card** — Fiat on-ramp via Stripe Checkout
- **Bridge & Swap** — Cross-chain (EVM/Solana → Stellar) via Wormhole Token Bridge
- **Send** — Direct Stellar-to-Stellar transfer via Freighter wallet

## Quick Setup

```bash
git clone https://github.com/ASGCompute/asg-pay-public.git
cd asg-pay-public
npm install
npm run dev    # → http://localhost:5173
```

## Project Structure

```
src/
├── App.tsx                    # Root component, URL params, balance fetching
├── types.ts                   # TypeScript interfaces (AppState, TokenInfo)
├── index.css                  # Full design system (1700+ lines)
├── components/
│   ├── AgentInfoCard.tsx      # Left panel: agent identity, destination, balances
│   ├── ExchangeWidget.tsx     # Right panel: tabbed payment interface
│   ├── PaymentSelection.tsx   # Initial payment method selection screen
│   ├── ReceiveWidget.tsx      # Bridge route selection + confirmation
│   ├── Header.tsx             # Page header
│   ├── ErrorBoundary.tsx      # Error boundary
│   └── modals/
│       ├── TokenModal.tsx     # Multi-chain token selector
│       ├── SettingsModal.tsx  # Bridge settings (slippage, gas, routes)
│       ├── WalletModal.tsx    # Wallet connection
│       └── ProgressOverlay.tsx # Transaction + Wormhole bridge progress
└── utils/
    └── stellar.ts             # Stellar SDK: build, sign, submit transactions
```

## Good First Issues

If you're new to the project, these are great starting points:

### Wormhole Integration
- **Wormhole Connect widget** — Embed the official Wormhole Connect React component in Bridge & Swap
- **Bridge status polling** — Query Wormhole API for real-time VAA and redemption status
- **Add Wormhole Relayer** — Integrate automatic relaying for gasless destination-chain redemption

### Stellar
- **SEP-24 anchor** — Add Stellar anchor integration for bank deposits
- **Soroban verification** — On-chain payment receipt via Soroban smart contract
- **Multi-sig support** — Allow multi-signature agent wallets

### UI/UX
- **Loading skeletons** — Show shimmer UI while Horizon balances load
- **Keyboard accessibility** — Escape key + focus trapping in modals
- **Mobile testing** — Responsive layout fixes for small screens

## Contribution Guidelines

1. **Fork** the repository
2. **Create a branch** (`feat/my-feature` or `fix/my-fix`)
3. **Make changes** following the existing code style
4. **Test locally** with `npm run dev` and `npm run build`
5. **Submit a Pull Request** with a clear description

### Code Style

- All CSS goes in `src/index.css` — no inline styles
- TypeScript strict mode enabled
- Functional components (React hooks only)
- Use existing CSS design tokens (`:root` variables)

## Community

- [GitHub Issues](https://github.com/ASGCompute/asg-pay-public/issues) — bugs and feature requests
- [asgcard.dev](https://asgcard.dev) — docs and ecosystem
- [Stellar Discord](https://discord.gg/stellar) — community discussion
- [Wormhole Discord](https://discord.gg/wormholecrypto) — bridge integration support
