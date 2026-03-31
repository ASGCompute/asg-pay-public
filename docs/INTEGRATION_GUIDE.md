# ASG Pay — Integration Guide

> For AI agent developers who want to integrate ASG Pay as their payment collection mechanism.

## Overview

ASG Pay turns a single URL into a complete cross-chain payment checkout. Your agent generates the URL, sends it to the user, and receives USDC on Stellar — regardless of which chain or payment method the user prefers.

```
Your Agent → generates URL → User opens portal → Selects method → Wormhole bridges → Agent wallet funded
```

## Quick Integration

### 1. Generate a Payment URL

```
https://fund.asgcard.dev/?agentName=MyAgent&toAddress=GDQP...&toAmount=100&toToken=USDC
```

### 2. URL Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `agentName` | string | Recommended | `Stacy agent` | Display name shown to the user |
| `toAddress` | string | **Required** | Demo address | Your Stellar public key (`G...`) |
| `toAmount` | number | Recommended | `50` | Amount in `toToken` units |
| `toToken` | string | No | `USDC` | Token to receive: `USDC` or `XLM` |
| `toChain` | string | No | `Stellar` | Settlement chain |

### 3. Example: Python Agent

```python
from urllib.parse import urlencode

def generate_payment_link(agent_name: str, address: str, amount: float, token: str = "USDC") -> str:
    params = {
        "agentName": agent_name,
        "toAddress": address,
        "toAmount": str(amount),
        "toToken": token,
    }
    return f"https://fund.asgcard.dev/?{urlencode(params)}"

link = generate_payment_link("Trading Bot", "GDQP2KPQGKIAEFHQ3XNKFYJVXVSHRQEB37AIR6T3JZWNM7YSHWM", 100)
```

### 4. Example: TypeScript Agent

```typescript
function generatePaymentLink(params: {
  agentName: string;
  toAddress: string;
  toAmount: number;
  toToken?: string;
}): string {
  const searchParams = new URLSearchParams({
    agentName: params.agentName,
    toAddress: params.toAddress,
    toAmount: String(params.toAmount),
    toToken: params.toToken || "USDC",
  });
  return `https://fund.asgcard.dev/?${searchParams.toString()}`;
}
```

## Payment Methods

### Bank & Card (Stripe)
- User enters amount → redirected to Stripe Checkout
- Supports credit/debit cards and bank transfers
- Settlement: Stripe → USDC purchased → sent to agent's Stellar wallet

### Bridge & Swap (Wormhole)
- User connects EVM/Solana wallet (MetaMask, Phantom, etc.)
- Selects source chain and token
- Wormhole Token Bridge routes tokens cross-chain to Stellar
- Settlement: Direct to agent's Stellar address
- See [WORMHOLE_BRIDGE.md](WORMHOLE_BRIDGE.md) for full bridge documentation

### Direct Send (Stellar)
- User connects Freighter wallet
- Signs a direct Stellar payment transaction
- Settlement: Immediate on Stellar network (~5 seconds)

## Self-Hosting

```bash
git clone https://github.com/ASGCompute/asg-pay-public.git
cd asg-pay-public
npm install
npm run build
```

Deploy `dist/` to any static hosting (Vercel, Netlify, Cloudflare Pages).

### Custom Branding

- Edit `src/index.css` — all design tokens are CSS variables at `:root`
- Edit `src/components/AgentInfoCard.tsx` — customize the left panel
- Edit `public/favicon.svg` — replace the icon

## Monitoring Payments

### Stellar Horizon API

```bash
curl "https://horizon.stellar.org/accounts/YOUR_ADDRESS/payments?order=desc&limit=5"
```

### Real-time Streaming

```typescript
import { Horizon } from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon.stellar.org");
server.payments()
  .forAccount("YOUR_ADDRESS")
  .cursor("now")
  .stream({
    onmessage: (payment) => {
      console.log(`Received ${payment.amount} ${payment.asset_code || "XLM"}`);
    },
  });
```

## Security

- **Destination locked** — users cannot change the recipient address
- **No private keys** — all signing happens in the user's wallet
- **Client-side only** — no backend stores sensitive data
- **Wormhole security** — bridge transactions secured by 19 Guardian validators
