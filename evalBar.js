const evalText = document.getElementById("currentEval");

const chessPieceValue = {
  p: 1,
  r: 5,
  n: 3,
  b: 3,
  q: 9,
  k: 100,
};

function evaluateBoard(game) {
  const board = game.board();
  let score = 0;

  for (let row of board) {
    for (let square of row) {
      if (square) {
        const val = chessPieceValue[square.type];
        score += square.color === "w" ? val : -val;
      }
    }
  }

  return score;
}

function EvalBar() {
  const score = evaluateBoard(game);
  evalText.innerText = score;
}