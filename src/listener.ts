// src/listener.ts  
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
  const logFile = path.join(logsDir, `events_${new Date().toISOString().slice(0,10).replace(/-/g,"")}.json`);

  console.log("🧩 Polling Base mainnet for Prediction events…");

  let lastBlock = await provider.getBlockNumber();

  // Проверяем каждые 30 сек
  setInterval(async () => {
    try {
      const current = await provider.getBlockNumber();
      const from = Math.max(current - 200, lastBlock);   // окно ≈ 200 блоков
      const events = await contract.queryFilter("Prediction", from, current);
      for (const e of events) {
        const data = {
          event: e.eventName,
          user: e.args?.[0],
          message: e.args?.[1],
          block: e.blockNumber,
          tx: e.transactionHash,
          timestamp: new Date().toISOString(),
        };
        console.log(`✨ ${data.user}: ${data.message}`);
        fs.appendFileSync(logFile, JSON.stringify(data) + "\n");
      }
      lastBlock = current;
    } catch (err) {
      console.warn("⚠️ polling error:", (err as Error).message);
    }
  }, 30_000);
}

main().catch(console.error);
