// src/listener.ts
// Listener for Base mainnet contract events
// Uses ethers.js v6 (installed via "npm install ethers")

import { ethers } from "ethers";

async function main() {
  const rpcUrl =
    process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const contractAddress =
    process.env.CONTRACT_ADDRESS ||
    "0x0a827a81C2Dd01acc9fE1E3a8F7c7CB753F7405F";

  console.log("🧩 Base Caster Lab — Event Listener");
  console.log("🔗 RPC:", rpcUrl);
  console.log("🏛 Contract:", contractAddress);

  // Minimal ABI: only event signatures you care about
  const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Prediction(address indexed user, string message)",
  ];

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(contractAddress, abi, provider);

  console.log("👂 Listening for contract events...");

  // Generic handler
  contract.on("*", (...args) => {
    const event = args[args.length - 1];
    console.log("\n📡 Event received:");
    console.log("  → name:", event.eventName);
    console.log("  → block:", event.blockNumber);
    console.log("  → tx:", event.transactionHash);
  });

  // Specific handler example
  contract.on("Prediction", (user: string, message: string, event: any) => {
    console.log(`✨ Prediction by ${user}: "${message}"`);
  });

  // Keep process alive
  process.on("SIGINT", () => {
    console.log("\n🛑 Listener stopped.");
    process.exit(0);
  });
}

main().catch((err) => {
  console.error("❌ Listener error:", err);
});
