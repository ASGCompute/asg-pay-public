/**
 * ASG Pay — TypeScript Integration Example
 *
 * Generate a payment URL for your AI agent. Users can fund
 * your agent from any chain via Wormhole bridge, fiat via Stripe,
 * or direct Stellar transfer.
 */

interface FundingParams {
  agentName: string;
  toAddress: string;
  toAmount: number;
  toToken?: string;
}

/**
 * Generate an ASG Pay funding URL.
 */
function createFundingUrl(params: FundingParams): string {
  const search = new URLSearchParams({
    agentName: params.agentName,
    toAddress: params.toAddress,
    toAmount: String(params.toAmount),
    toToken: params.toToken || "USDC",
  });
  return `https://fund.asgcard.dev/?${search.toString()}`;
}

// Example: Generate a funding link for a trading bot
const url = createFundingUrl({
  agentName: "Trading Bot",
  toAddress: "GDQP2KPQGKIAEFHQ3XNKFYJVXVSHRQEB37AIR6T3JZWNM7YSHWM",
  toAmount: 100,
});

console.log(`Fund your agent: ${url}`);
