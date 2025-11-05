// src/listener.ts
// Base mainnet event polling listener with auto-shutdown
import { ethers } from "ethers";
import fs from "fs";
import path from "path";

async function main() {
  const rpcUrl = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const address = process.env.CONTRACT_ADDRESS!;
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  const abi = [
    "event Prediction(address indexed user, string message)",
  ];
  const contract = new ethers.Contract(address, abi, provider);

  const logsDir = path.resolve("logs");
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
  const logFile = path.join(
    logsDir,
    `events_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}.json`
  );

  console.log("🧩 Base Caster Lab — Polling for Prediction events");
  console.log("🔗 RPC:", rpcUrl);
  console.log("🏛 Contract:", address);
  console.log("🕒 Will auto-stop after 2 minutes\n");

  let lastBlock = await provider.getBlockNumber();

  const interval = setInterval(async () => {
    try {
      const current = await provider.getBlockNumber();
      const from = Math.max(current - 200, lastBlock);
      const events = await contract.queryFilter("Prediction", from, current);

      for (const e of events) {
        const record = {
          event: e.eventName,
          user: e.args?.[0],
          message: e.args?.[1],
          block: e.blockNumber,
          tx: e.transactionHash,
          timestamp: new Date().toISOString(),
        };
        console.log(`✨ ${record.user}: "${record.message}"`);
        fs.appendFileSync(logFile, JSON.stringify(record) + "\n");
      }

      lastBlock = current;
    } catch (err) {
      console.warn("⚠️ Polling error:", (err as Error).message);
    }
  }, 30_000);

  // Auto-stop after 2 minutes
  setTimeout(() => {
    clearInterval(interval);
    console.log("\n🛑 Listener stopped after 2 minutes.");
    process.exit(0);
  }, 2 * 60 * 1000);
}

main().catch((err) => {
  console.error("❌ Listener crashed:", err);
  process.exit(1);
});
