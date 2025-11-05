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
