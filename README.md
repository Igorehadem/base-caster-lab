# 🧪 Base Caster Lab

**Experimental playground for Base + Farcaster integrations.**  
Collect, observe and prototype on-chain interactions in the Base ecosystem.

---

## 🎯 Purpose
Base Caster Lab is a research & utility repo — not a production app.  
Here we experiment with:
- Listening to Base network events  
- Parsing and storing tx metadata  
- Testing Farcaster ↔ Base integrations  
- Preparing data for new Frame ideas  

---

## 📂 Structure
src/
└─ listener.ts # event listener prototype
.env.example # environment variables (Base RPC, contract etc.)
README.md # project overview


---

## ⚙️ Roadmap
- [x] Add configurable event listener for Base contracts  
- [x] Implement logging and filtering utilities  
- [ ] Connect Farcaster identity to on-chain activity  
- [ ] Visualize metrics (casts ↔ tx)  

---

## 🧩 Relation to other repos
| Repo | Role |
|------|------|
| [farcaster-frame-demo](https://github.com/Igorehadem/farcaster-frame-demo) | Front-end demo showing Base Frames |
| **base-caster-lab** | Back-end / infra playground & experiments |

---

## 🪄 Author
Built by [Igor (@Igorehadem)](https://github.com/Igorehadem) ✦
