// ----------------------------------------------------------
// 📊 Base Caster Lab — Status Dashboard
// Displays last logged events from /logs/ folder
// Auto-refreshes every 10 seconds
// ----------------------------------------------------------

import fs from "fs";
import path from "path";

export const config = { runtime: "edge" };

export default async function handler() {
  const logsDir = path.resolve("logs");
  const files = fs.existsSync(logsDir)
    ? fs.readdirSync(logsDir).filter((f) => f.endsWith(".json")).sort().reverse()
    : [];

  let events = [];
  if (files.length > 0) {
    const lastFile = path.join(logsDir, files[0]);
    const lines = fs.readFileSync(lastFile, "utf8").trim().split("\n");
    events = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .reverse(); // newest on top
  }

  const total = events.length;
  const last5 = events.slice(0, 5);

  const html = `
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="robots" content="noindex,nofollow" />
      <title>Base Caster Lab — Status</title>
      <style>
        body {
          background: #0b0c10;
          color: #d1d5db;
          font-family: ui-monospace, monospace;
          padding: 20px;
          line-height: 1.5;
        }
        h1 { color: #58a6ff; }
        .event {
          background: #161b22;
          border-left: 3px solid #58a6ff;
          margin: 8px 0;
          padding: 10px 12px;
          border-radius: 6px;
        }
        .event:first-child {
          background: #1e1e2f;
          border-left-color: #22c55e;
        }
        .meta { color: #9ca3af; font-size: 14px; }
      </style>
      <script>
        setTimeout(() => location.reload(), 10000);
      </script>
    </head>
    <body>
      <h1>🧠 Base Caster Lab — Status Dashboard</h1>
      <p>Showing last 5 events (of ${total} total)</p>

      ${last5
        .map(
          (ev) => `
        <div class="event">
          <div><strong>${ev.event}</strong> — <span>${ev.message}</span></div>
          <div class="meta">
            User: ${ev.user}<br/>
            Block: ${ev.block} | Tx: ${ev.tx.slice(0, 10)}...<br/>
            Time: ${new Date(ev.timestamp).toLocaleString()}
          </div>
        </div>`
        )
        .join("")}

      <p style="margin-top: 30px; font-size: 13px; color: #6b7280;">
        Auto-refreshes every 10 s · Last file: ${files[0] || "none"}
      </p>
    </body>
  </html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
