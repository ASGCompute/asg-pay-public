/**
 * ASG Pay — Stellar Payment Monitor
 *
 * Streams real-time payments to your agent's Stellar wallet.
 * Use this to trigger agent actions when funding is received.
 */

import { Horizon } from "@stellar/stellar-sdk";

const AGENT_ADDRESS = "YOUR_AGENT_STELLAR_PUBLIC_KEY";
const HORIZON_URL = "https://horizon.stellar.org";

const server = new Horizon.Server(HORIZON_URL);

console.log(`Monitoring payments for: ${AGENT_ADDRESS}`);
console.log("Waiting for incoming payments...\n");

server
  .payments()
  .forAccount(AGENT_ADDRESS)
  .cursor("now")
  .stream({
    onmessage: (payment: any) => {
      if (payment.type === "payment" && payment.to === AGENT_ADDRESS) {
        const token = payment.asset_code || "XLM";
        const amount = payment.amount;
        const from = payment.from;

        console.log(`✅ Payment received!`);
        console.log(`   Amount: ${amount} ${token}`);
        console.log(`   From:   ${from}`);
        console.log(`   Tx:     ${payment.transaction_hash}\n`);

        // TODO: Trigger your agent's action here
        // e.g., resume operation, confirm funding, etc.
      }
    },
    onerror: (error: any) => {
      console.error("Stream error:", error);
    },
  });
