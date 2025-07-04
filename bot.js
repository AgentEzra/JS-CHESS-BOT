function makeBestMove(depth = 2) {
  const possibleMoves = game.moves({ verbose: true });
  if (possibleMoves.length === 0) return;

  let bestMove = null;
  let bestScore = -Infinity;

  for (let move of possibleMoves) {
    game.move(move);
    const score = mini(depth - 1);
    game.undo();

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  if (bestMove) {
    game.move(bestMove);
    board.position(game.fen());
    moveSound.play();
    EvalBar();
  }
}

function maxi(depth) {
  if (depth === 0 || game.game_over()) return evaluateBoard(game);

  let maxEval = -Infinity;
  const moves = game.moves({ verbose: true });

  for (let move of moves) {
    game.move(move);
    const evalScore = mini(depth - 1);
    game.undo();
    if (evalScore > maxEval) maxEval = evalScore;

    const score = evaluateBoard(game);
    console.log("mini (depth 0):", score);
    return score;
  }

  return maxEval;
}

function mini(depth) {
  if (depth === 0 || game.game_over()) return -evaluateBoard(game);

  let minEval = Infinity;
  const moves = game.moves({ verbose: true });

  for (let move of moves) {
    game.move(move);
    const evalScore = maxi(depth - 1);
    game.undo();
    if (evalScore < minEval) minEval = evalScore;

    const score = -evaluateBoard(game);
    console.log("mini (depth 0):", score);
    return score;
  }

  return minEval;
}

function makeRandomMove() {
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
}
