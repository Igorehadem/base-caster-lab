# 🔮 Base Caster Lab

**Experimental Farcaster Frame on Base Network**  
Predict your fate — directly onchain. Built with Next.js (Edge) + @vercel/og + Base.

---

## 🧠 How it works

This Frame renders an image and, on button press, asks the client to send an on-chain transaction to a contract on **Base**.

- **`/api/frame`** — returns HTML with Warpcast Frame meta (image + button + tx action).  
- **`/api/tx`** — returns a JSON payload with a prepared `eth_sendTransaction` (method `predict(string)`), pointing to your contract on Base.  
- **`/api/og`** — dynamic OG image with a starry background and custom text.

The repo is public & forkable. No private keys required.

---

## 🧰 Stack

- Next.js 14 (Edge runtime)
- @vercel/og for dynamic images
- Base (Sepolia for testing or Mainnet)
- Zero backend secrets (only a contract address)

---

## 🚀 Deploy (Vercel)

1. **Fork** this repo.
2. Import to **Vercel**.
3. (Optional) Set env var:
   ```bash
   CONTRACT_ADDRESS=0xYourContractAddressHere


---

## 🔗 Endpoints

- **Frame meta**: `/api/frame`  
Returns HTML with:
- `og:title`, `og:image`
- `fc:frame:image`
- `fc:frame:button:1` with `action="tx"` → target `/api/tx`

- **Transaction builder**: `/api/tx`  
Generates a random “Fate #<n>” and builds calldata for:

predict(string) // selector 0x2cde5c80

Response includes:
- `transactions: [ { chain: "base-mainnet" | "base-sepolia", method: "eth_sendTransaction", params: [...] } ]`
- `image`, `buttons`, `post_url`

- **Dynamic OG image**: `/api/og?text=Your+Fate`  
Renders a 1024×1024 image with star field + centered text.

---

## 🧪 Local dev

```bash
npm install
npm run dev
# open http://localhost:3000/api/frame
The app auto-detects host to produce correct absolute URLs for images/meta.

```
⚙️ Config

Set CONTRACT_ADDRESS via env to point at your own contract.

Default node version: >=18 (see package.json).

Next.js config: standalone output, Edge runtime for API routes.

💡 Ideas / Next steps

Toggle Base Sepolia/Mainnet by env.

Add metrics log (casts, clicks, txs).

Multiple buttons (e.g., “New Fate”, “Claim NFT”).

Subgraph / viem integration for reading on-chain results.

🧩 Credits

Built by Igor (@Igorehadem)
.
Inspired by Base Frames & Warpcast experiments. ✦   
