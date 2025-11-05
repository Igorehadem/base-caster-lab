// api/status.js
// Status endpoint with safe file access for Node runtime

export const config = { runtime: "nodejs" };

import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const rpc = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  const contract =
    process.env.CONTRACT_ADDRESS ||
    "0x0a827a81C2Dd01acc9fE1E3a8F7c7CB753F7405F";

  let lastLines = [];
  try {
    const logsDir = path.resolve("logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    const files = fs
      .readdirSync(logsDir)
      .filter((f) => f.startsWith("events_"))
      .sort()
      .reverse();
    if (files.length > 0) {
      const latest = path.join(logsDir, files[0]);
      const content = fs.readFileSync(latest, "utf8").trim().split("\n");
      lastLines = content.slice(-5).map((line) => JSON.parse(line));
    }
  } catch (err) {
    console.error("⚠️ Log read error:", err.message);
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
    <html>
      <head>
        <title>Base Caster Lab Status</title>
        <meta http-equiv="refresh" content="10" />
        <style>
          body { font-family: system-ui, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f3f3f3; }
          pre { margin: 0; }
        </style>
      </head>
      <body>
        <h1>🧪 Base Caster Lab Status</h1>
        <p><b>RPC:</b> ${rpc}</p>
        <p><b>Contract:</b> ${contract}</p>
        <h3>🗄 Last Events (auto-refresh every 10s)</h3>
        ${
          lastLines.length
            ? `<table><tr><th>Event</th><th>Block</th><th>Tx</th><th>Time</th></tr>
              ${lastLines
                .map(
                  (e) =>
                    `<tr><td>${e.event || e.name}</td><td>${e.block}</td><td><pre>${e.tx.slice(
                      0,
                      10
                    )}...</pre></td><td>${e.timestamp}</td></tr>`
                )
                .join("")}</table>`
            : `<p>No log entries yet.</p>`
        }
      </body>
    </html>
  `);
}
