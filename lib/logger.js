// ----------------------------------------------------------
// 🧾 Base Caster Lab - Logger Utility
// Handles writing JSON logs with timestamped entries
// Used by src/listener.ts and other scripts
// ----------------------------------------------------------

import fs from "fs";
import path from "path";

export function ensureLogsDir() {
  const dir = path.resolve("logs");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
}

export function getDailyLogPath() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const dir = ensureLogsDir();
  return path.join(dir, `events_${today}.json`);
}

export function appendLog(record) {
  try {
    const file = getDailyLogPath();
    const entry = { ...record, timestamp: new Date().toISOString() };
    fs.appendFileSync(file, JSON.stringify(entry) + "\n");
    console.log(`📝 Logged event → ${entry.event} (${entry.user})`);
  } catch (err) {
    console.warn("⚠️ Log append error:", err.message);
  }
}
