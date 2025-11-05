export const config = { runtime: "edge" };

// Demo contract on Base (or use your own)
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS ||
  "0x0a827a81C2Dd01acc9fE1E3a8F7c7CB753F7405F";

// keccak256("predict(string)") = 0x2cde5c80
const SELECTOR_PREDICT = "0x2cde5c80";

export default async function handler(req) {
  // --- Config log for debugging ---
  const activeContract = CONTRACT_ADDRESS;
  const activeChain = "base-mainnet";
  console.log(`🧩 Base Caster Config →`, {
    contract: activeContract,
    chain: activeChain,
    envLoaded: !!process.env.CONTRACT_ADDRESS,
  });

  // Generate random “Fate”
  const fateNumber = Math.floor(Math.random() * 9999) + 1;
  const message = `Fate #${fateNumber}`;
  const messageHex = Buffer.from(message, "utf8").toString("hex");
  const messagePadded = messageHex.padEnd(64 * 2, "0");
  const calldata = `${SELECTOR_PREDICT}${messagePadded}`;

  const tx = {
    chain: activeChain,
    method: "eth_sendTransaction",
    params: [
      {
        to: CONTRACT_ADDRESS,
        value: "0x0",
        data: calldata,
      },
    ],
  };

  const response = {
    version: "next",
    title: "Predict your Fate",
    description: "Base Caster Lab transaction test",
    transactions: [tx],
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
