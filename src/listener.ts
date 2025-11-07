// ----------------------------------------------------------
// 🧠 Base Caster Lab — Base mainnet event polling listener
// Safe for TypeScript & GitHub Actions (no secrets)
// ----------------------------------------------------------

import { ethers, EventLog } from "ethers";
import { appendLog, ensureLogsDir } from "../lib/logger.js";

// Entry point
async function main() {
  const rpcUrl = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const contractAddress =
    process.env.CONTRACT_ADDRESS ||
    "0x0a827a81C2Dd01acc9fE1E3a8F7c7CB753F7405F";

  const abi = ["event Prediction(address indexed user, string message)"];
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(contractAddress, abi, provider);

  ensureLogsDir();

  console.log("🧠 Base Caster Lab — Polling for Prediction events");
  console.log("🔗 RPC:", rpcUrl);
  console.log("📜 Contract:", contractAddress);
  console.log("⏱️  Polling every 30 seconds...");

  let lastBlock = await provider.getBlockNumber();

  const interval = setInterval(async () => {
    try {
      const current = await provider.getBlockNumber();
      const from = Math.max(current - 200, lastBlock);
      const events = await contract.queryFilter("Prediction", from, current);

      for (const e of events) {
        if (e instanceof EventLog) {
          const record = {
            event: e.eventName || "Prediction",
            user: e.args?.[0],
            message: e.args?.[1],
            block: e.blockNumber,
            tx: e.transactionHash,
          };
          appendLog(record);
        }
      }

      lastBlock = current;
    } catch (err) {
      console.warn("⚠️ Polling error:", err.message);
    }
  }, 30_000);
}

main().catch((err) => {
  console.error("❌ Listener crashed:", err.message);
  process.exit(1);
});
