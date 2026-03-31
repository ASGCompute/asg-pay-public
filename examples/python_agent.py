"""
ASG Pay — Python Integration Example

Generate a payment URL for your AI agent. Users can fund
your agent from any chain via Wormhole bridge, fiat via Stripe,
or direct Stellar transfer.
"""

from urllib.parse import urlencode


def create_funding_url(
    agent_name: str,
    stellar_address: str,
    amount: float,
    token: str = "USDC",
) -> str:
    """Generate an ASG Pay funding URL.

    Args:
        agent_name: Display name for the AI agent
        stellar_address: Stellar public key (G...)
        amount: Amount to fund in token units
        token: Token to receive (USDC or XLM)

    Returns:
        Full ASG Pay URL
    """
    params = {
        "agentName": agent_name,
        "toAddress": stellar_address,
        "toAmount": str(amount),
        "toToken": token,
    }
    return f"https://fund.asgcard.dev/?{urlencode(params)}"


if __name__ == "__main__":
    # Example: Generate a funding link for a trading bot
    url = create_funding_url(
        agent_name="Trading Bot",
        stellar_address="GDQP2KPQGKIAEFHQ3XNKFYJVXVSHRQEB37AIR6T3JZWNM7YSHWM",
        amount=100,
    )
    print(f"Fund your agent: {url}")
