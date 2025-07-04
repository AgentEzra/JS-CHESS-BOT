function makeRandomMove() {
  var possibleMoves = game.moves();
  moveSound.play();

  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());

  // game over
  if (possibleMoves.length === 0) {
    return;
  }
}
