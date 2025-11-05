// src/listener.ts
// Base mainnet contract listener with JSON logging
// Requires: npm install ethers fs-extra

import { ethers } from "ethers";
import fs from "fs";
import path from "path";

async function main() {
  const rpcUrl = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const contractAddress =
    process.env.CONTRACT_ADDRESS ||
    "0x0a827a81C2Dd01acc9fE1E3a8F7c7CB753F7405F";

  console.log("🧩 Base Caster Lab — Event Listener");
  console.log("🔗 RPC:", rpcUrl);
  console.log("🏛 Contract:", contractAddress);

  const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Prediction(address indexed user, string message)",
  ];

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const logsDir = path.resolve("logs");
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

  const logFile = path.join(
    logsDir,
    `events_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}.json`
  );

  console.log("🗄 Logging events to:", logFile);

  const appendLog = (data: any) => {
    fs.appendFileSync(logFile, JSON.stringify(data) + "\n");
  };

  contract.on("*", (...args) => {
    const event = args[args.length - 1];
    const record = {
      name: event.eventName,
      block: event.blockNumber,
      tx: event.transactionHash,
      timestamp: new Date().toISOString(),
    };
    console.log(`📡 ${record.name} @ block ${record.block}`);
    appendLog(record);
  });

  contract.on("Prediction", (user: string, message: string, event: any) => {
    const data = {
      event: "Prediction",
      user,
      message,
      block: event.blockNumber,
      tx: event.transactionHash,
      timestamp: new Date().toISOString(),
    };
    console.log(`✨ Prediction by ${user}: "${message}"`);
    appendLog(data);
  });

  process.on("SIGINT", () => {
    console.log("\n🛑 Listener stopped.");
    process.exit(0);
  });
}

main().catch((err) => {
  console.error("❌ Listener error:", err);
});
