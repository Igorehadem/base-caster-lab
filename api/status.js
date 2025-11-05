// api/status.js
// Minimal endpoint to verify Base connection and log files
import fs from "fs";
import path from "path";

export const config = { runtime: "nodejs" };

export default async function handler(req) {
  const rpc = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const contract = process.env.CONTRACT_ADDRESS || "0x0a827a81C2Dd01acc9fE1E3a8F7c7CB753F7405F";

  // Collect last 5 lines from latest log file (if exists)
  const logsDir = path.resolve("logs");
  let lastLines = [];
  try {
    const files = fs.readdirSync(logsDir).filter(f => f.startsWith("events_"));
    if (files.length > 0) {
      const latest = path.join(logsDir, files.sort().reverse()[0]);
      const content = fs.readFileSync(latest, "utf8").trim().split("\n");
      lastLines = content.slice(-5).map(line => JSON.parse(line));
    }
  } catch {
    lastLines = [];
  }

  const html = `
    <html>
      <head><title>Base Caster Lab Status</title></head>
      <body style="font-family:sans-serif;padding:20px;">
        <h1>🧪 Base Caster Lab Status</h1>
        <p><b>RPC:</b> ${rpc}</p>
        <p><b>Contract:</b> ${contract}</p>
        <h3>🗄 Last Events (from logs/)</h3>
        <pre style="background:#111;color:#0f0;padding:10px;border-radius:8px;">
${lastLines.length ? JSON.stringify(lastLines, null, 2) : "No logs yet."}
        </pre>
      </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
