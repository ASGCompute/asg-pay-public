# ASG Pay — Technical Overview

## System Design

ASG Pay is a **client-side React SPA** that provides a universal checkout interface for funding AI agent wallets on the Stellar network. It supports three payment rails: fiat (Stripe), cross-chain (Wormhole), and direct (Stellar/Freighter).

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Client-side only** | Zero backend dependency = self-hostable, no server costs, no data custody risk |
| **URL-parameterized** | Any agent generates a payment link without API keys or authentication |
| **Stellar settlement** | Fast finality (~5s), low fees (~$0.00001), native USDC support |
| **Wormhole bridge** | Broadest chain coverage, institutional-grade Guardian security, open protocol |
| **CSS-only design system** | 1700+ lines of CSS variables — no Tailwind, no CSS-in-JS, maximum portability |

### Component Architecture

```
App.tsx
├── Header                      # Wallet status, theme toggle
├── AgentInfoCard               # Agent identity, destination, live Stellar balances
├── PaymentSelection            # Method picker (Fiat / Stablecoin / Crypto)
└── ExchangeWidget              # Tabbed payment interface
    ├── Bank & Card Tab         # Stripe Checkout with fee calculation
    ├── Bridge & Swap Tab       # Wormhole bridge flow
    │   ├── TokenModal          # Multi-chain token/chain selector
    │   ├── SettingsModal       # Slippage, gas, route config
    │   └── ReceiveWidget       # Route preview + confirmation
    └── Send Tab                # Direct Stellar send via Freighter
        ├── WalletModal         # Freighter / MetaMask / Phantom / WC
        └── ProgressOverlay     # Tx tracking + bridge progress + success
```

### State Management

Single `AppState` object lifted to `App.tsx`, passed via props. No external state library.

```typescript
interface AppState {
  // Agent info (from URL params)
  agentName: string;
  toAddress: string;
  toAmount: number;
  toToken: string;
  toChain: string;

  // Selected source
  fromToken: TokenInfo | null;

  // Live balances (from Stellar Horizon)
  usdcBalance: number;
  xlmBalance: number;
  totalUsd: number;

  // Wallet state
  walletConnected: boolean;
  connectedWallet: string | null;
  network: string; // TESTNET | MAINNET

  // UI state
  activeOverlay: 'none' | 'tokens' | 'settings' | 'wallets' | 'progress' | 'qr';
  activeTab: 'bridge' | 'send' | 'fiat';
  viewMode: 'selection' | 'widget';
  selectedRouteId: string | null;
}
```

### Data Flows

1. **Balance fetching** — `App.tsx` queries Stellar Horizon + Binance API on mount
2. **Transaction building** — `utils/stellar.ts` uses `@stellar/stellar-sdk` to build payment ops
3. **Transaction signing** — Freighter API signs XDR in the user's browser extension
4. **Bridge flow** — Wormhole SDK handles cross-chain token lock → attest → redeem
5. **Fiat flow** — Redirect to Stripe Checkout → webhook → settlement
