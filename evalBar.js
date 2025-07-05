const evalText = document.getElementById("currentEval");

// Piece values (same for both colors)
const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 100,
};

// Piece-square tables (White's perspective)
const pieceSquareTables = {
  p: [
    // Pawns (encouraged to advance, control center)
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0.5, 1, 1, -2, -2, 1, 1, 0.5],
    [0.5, -0.5, -1, 0, 0, -1, -0.5, 0.5],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0.5, 0.5, 1, 2.5, 2.5, 1, 0.5, 0.5],
    [1, 1, 2, 3, 3, 2, 1, 1],
    [5, 5, 5, 5, 5, 5, 5, 5], // Encourages pawn pushes
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  n: [
    // Knights (centralized = better)
    [-5, -4, -3, -3, -3, -3, -4, -5],
    [-4, -2, 0, 0.5, 0.5, 0, -2, -4],
    [-3, 0.5, 1, 1.5, 1.5, 1, 0.5, -3],
    [-3, 0, 1.5, 2, 2, 1.5, 0, -3], // Best central control
    [-3, 0.5, 1.5, 2, 2, 1.5, 0.5, -3],
    [-3, 0, 1, 1.5, 1.5, 1, 0, -3],
    [-4, -2, 0, 0, 0, 0, -2, -4],
    [-5, -4, -3, -3, -3, -3, -4, -5],
  ],
  // ... (keep other tables the same as before)
};

// Get the correct table value (flips for Black)
function getTableValue(pieceType, x, y, color) {
  if (!pieceSquareTables[pieceType]) return 0;
  const row = color === "w" ? x : 7 - x; // Flip Y-coordinate for Black
  return pieceSquareTables[pieceType][row]?.[y] || 0;
}

// Detect if a piece is under attack
function isHanging(game, x, y) {
  const square = String.fromCharCode(97 + y) + (8 - x);
  const moves = game.moves({ verbose: true });
  return moves.some((move) => move.to === square && move.captured);
}

// Main evaluation function (now color-aware)
function evaluateBoard(game) {
  if (game.game_over()) {
    if (game.in_checkmate()) return game.turn() === "w" ? -9999 : 9999;
    return 0; // Draw
  }

  let score = 0;
  const board = game.board();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (!piece) continue;

      const value = pieceValues[piece.type];
      const colorFactor = piece.color === "w" ? 1 : -1;

      // 1. Material score
      score += value * colorFactor;

      // 2. Positional score (now color-adjusted)
      score += getTableValue(piece.type, i, j, piece.color) * colorFactor * 0.1;

      // 3. Penalize hanging pieces
      if (isHanging(game, i, j)) {
        score -= value * colorFactor * 0.5; // Lose half value if hanging
      }
    }
  }

  // 4. Castling bonus (adjusted for color)
  const hasCastled = game.history().some((move) => move.includes("O-O"));
  if (!hasCastled) {
    score += game.turn() === "w" ? -0.5 : 0.5;
  }

  return score;
}

// Update evaluation display
function EvalBar() {
  const score = evaluateBoard(game);
  evalText.innerText = score.toFixed(1); // Show 1 decimal place
}
