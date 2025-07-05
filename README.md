# JS-CHESS-BOT  
*A browser-based chess AI using chess.js + chessboard.js*  
⚠️ **Archived**: Not maintained due to browser performance issues.  

---

## ▶️ Quick Start  
1. Download the files  
2. Open `index.html` in any browser *(no npm install needed!)*  

---

## 🤖 Bot Modes  
### 🎲 Random Moves  
```
// In board.js (line 38):
window.setTimeout(makeRandomMove, 250); 
```
- Picks any legal move instantly  

### 🧠 Smart Moves  
```js
// In board.js (line 38), replace with:
window.setTimeout(makeBestMove, 250);

// In bot.js (line 1), adjust difficulty:
function makeBestMove(maxDepth = 3)  // Higher = smarter but slower
```

---

## ⚠️ Limitations  
❌ **Browser lag** at depth > 3  
❌ **No updates planned**  
💡 *For better performance, try compiled engines like Stockfish*

---

## 📚 Package Used  
- [chess.js](https://github.com/jhlywa/chess.js) (game logic)  
- [chessboard.js](http://chessboardjs.com) (UI)  

---

## 🔍 Why So Slow?  
Browser JavaScript isn't optimized for:  
- Deep recursive searches (minimax)  
- Heavy board evaluation  
- Multi-threading  
```

---
