[![Base](https://img.shields.io/badge/Network-Base-blue)](https://base.org)
[![Farcaster](https://img.shields.io/badge/Farcaster-Integration-purple)](https://warpcast.com)
[![GitHub Actions](https://img.shields.io/badge/Cron%20Job-Listener-green)](./.github/workflows/listener-cron.yml)
[![Builder+](https://img.shields.io/badge/TalentProtocol-Builder%2B-teal)](https://talentprotocol.com)

# 🧠 Base Caster Lab

> **Experimental playground for Base × Farcaster integrations.**  
> Collect, observe, and prototype on-chain events in the Base ecosystem.

---

## 🎯 Purpose

**Base Caster Lab** is a research & utility repo — not a production app.  
It provides a small infrastructure for **listening to Base Mainnet events**, storing them in JSON logs, and displaying results through a simple `/api/status` endpoint.

Here we experiment with:

- Listening to Base contract events
- Persisting tx metadata and contract calls
- Connecting Farcaster Frames with on-chain activity
- Preparing data for new Frame ideas

---

## 🧩 Structure

```
src/
  listener.ts      # Base event listener (TypeScript)
api/
  status.js        # Displays last logged events in HTML
logs/
  events_YYYYMMDD.json  # Daily event logs
.github/workflows/
  listener-cron.yml     # GitHub Action: scheduled listener
.env.example        # Environment variable template
package.json        # Node project config
README.md           # Project overview
```

---

## ⚙️ How It Works

### 1️⃣ Scheduled Listener (GitHub Action)
The workflow `.github/workflows/listener-cron.yml` runs every few hours (or on manual dispatch).  
It executes `src/listener.ts`, which connects to the **Base Mainnet RPC**, fetches new events, and stores them under `/logs/events_YYYYMMDD.json`.

### 2️⃣ Status API
`/api/status.js` reads the most recent log and renders the last few events as a live HTML page with auto-refresh (10s).

---

## 🧰 Tech Stack

| Layer | Tool / Library | Purpose |
|-------|----------------|----------|
| Runtime | Node.js 20+ | JS/TS execution |
| Blockchain | [Base Mainnet](https://base.org) | Network source |
| SDK | [ethers.js](https://docs.ethers.org) | Contract interaction |
| Hosting | GitHub Actions + Vercel | Cron + API endpoints |

---

## 🧾 Environment Variables

📄 `.env.example`

```
# Base mainnet RPC (public endpoint or your own)
BASE_RPC_URL=https://mainnet.base.org

# Example contract used for 'predict(string)' calls
CONTRACT_ADDRESS=0x0a827a81C2Dd01acc9fE1E3a8F7c7CB753F7405F

# Optional: polling frequency (seconds)
SAVE_INTERVAL=30
```

---

## 🗺️ Roadmap

- [x] Add configurable event listener for Base contracts  
- [x] Implement logging and filtering utilities  
- [ ] Connect Farcaster identity to on-chain activity  
- [ ] Visualize metrics (casts × tx × predictions)  
- [ ] Add Discord or Farcaster webhook alerts  

---

## 🔗 Related Repos

| Repo | Role |
|------|------|
| [farcaster-frame-demo](https://github.com/Igorehadem/farcaster-frame-demo) | Front-end demo showing Base Frame logic |
| **base-caster-lab** | Back-end / infra playground & experiments |

---

## 🧑‍💻 Local Development

```bash
npm install
npm run dev
# or
node src/listener.ts
```

Logs will appear under `/logs/` as daily JSON files.

---

## 📈 Example Output

Each log entry includes event name, user, block number, tx hash, and timestamp:

```json
{
  "event": "Prediction",
  "user": "0x1234...abcd",
  "message": "Fate #42",
  "block": 12345678,
  "tx": "0xabc...def",
  "timestamp": "2025-11-07T09:15:31Z"
}
```

---

## 🧩 Stack Summary

- **Node.js 20+**
- **TypeScript**
- **ethers.js**
- **GitHub Actions (cron)**
- **Base Mainnet RPC**
- **Farcaster Frames experiments**

---

## 🔒 Security Notes

- Never commit private keys or wallets.  
- Keep RPC and contract addresses in `.env.local`.  
- Logs are public, but safe (contain only on-chain data).

---

## 📜 License

MIT License © 2025 [Igorehadem](https://github.com/Igorehadem)

---

## 🧱 Development Summary

> Repository activity and maintenance checklist for Base Caster Lab

| # | Commit Type | Description | Status |
|---|--------------|-------------|:------:|
| 1 | `docs:` | ✏️ Rebuilt and structured `README.md` with badges, roadmap & stack | ✅ |
| 2 | `docs:` | 🧠 Added detailed comments to `.github/workflows/listener-cron.yml` | ✅ |
| 3 | `feat:` | 🧾 Created `/lib/logger.js` utility for consistent JSON logging | ✅ |
| 4 | `refactor:` | ♻️ Rewrote `src/listener.ts` to use logger utility | ✅ |
| 5 | `feat:` | 📊 Enhanced `/api/status.js` with auto-refresh and event counter | ✅ |
| 6 | `docs:` | 🔧 Updated `.env.example` with `SAVE_INTERVAL` and comments | ✅ |
| 7 | `meta:` | 🪪 Updated `package.json` with description, author, keywords | ✅ |
| 8 | `chore:` | 📜 Added MIT License | ✅ |
| 9 | `chore:` | 🧹 Added `.prettierrc` and `.editorconfig` | ✅ |
| 10 | `docs:` | 🧱 Added this summary checklist section | ✅ |

---

### 🧭 Project Highlights
- Modular architecture (logger, listener, API, cron)
- Reusable structure for any Base + Farcaster experiment
- Zero private keys, 100% public-safe  
- Ready-to-fork demo for other Base builders 🚀

_Last updated: **${new Date().toISOString().slice(0,10)}**_

