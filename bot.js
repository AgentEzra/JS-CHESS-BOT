function makeBestMove(maxDepth = 2, timeLimit = 20000) {
  const start = performance.now();
  const possibleMoves = game.moves({ verbose: true });
  if (possibleMoves.length === 0) return;

  let bestMove = possibleMoves[0]; // default to first move
  let bestScore = -Infinity;

  // Iterative deepening
  for (let depth = 1; depth <= maxDepth; depth++) {
    let alpha = -Infinity;
    let beta = Infinity;
    let currentBestMove = bestMove; // reuse previous best move for move ordering

    for (let move of possibleMoves) {
      game.move(move);
      const score = mini(depth - 1, alpha, beta);
      game.undo();

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestScore);

      // Time check
      if (performance.now() - start > timeLimit) {
        break; // stop searching if out of time
      }
    }

    if (performance.now() - start > timeLimit) break;
  }

  if (bestMove) {
    game.move(bestMove);
    board.position(game.fen());
    moveSound.play();
    EvalBar();
    const end = performance.now();
    msTime.innerText = `⏱️ ${(end - start).toFixed(2)}ms`;
  }
}

// Maximizing player (White)
function maxi(depth, alpha, beta) {
  if (depth === 0 || game.game_over()) return evaluateBoard(game);

  let maxEval = -Infinity;
  const moves = game.moves({ verbose: true });

  for (let move of moves) {
    game.move(move);
    const evalScore = mini(depth - 1, alpha, beta);
    game.undo();

    maxEval = Math.max(maxEval, evalScore);
    alpha = Math.max(alpha, evalScore); // Update alpha
    if (beta <= alpha) break; // Beta cutoff
  }

  return maxEval;
}

// Minimizing player (Black)
function mini(depth, alpha, beta) {
  if (depth === 0 || game.game_over()) return evaluateBoard(game);

  let minEval = Infinity;
  const moves = game.moves({ verbose: true });

  for (let move of moves) {
    game.move(move);
    const evalScore = maxi(depth - 1, alpha, beta);
    game.undo();

    minEval = Math.min(minEval, evalScore);
    beta = Math.min(beta, evalScore); // Update beta
    if (beta <= alpha) break; // Alpha cutoff
  }

  return minEval;
}

function makeRandomMove() {
  const start = performance.now();
  var possibleMoves = game.moves();
  moveSound.play();
  

  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
  EvalBar();

  // game over
  if (possibleMoves.length === 0) {
    return;
  }
  const end = performance.now();
  msTime.innerText = `⏱️ ${(end - start).toFixed(2)}ms`;
  return score;
}
