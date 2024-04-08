import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//  note: ensure that board is a COPY of initialBoard, not a reference to it.
//        this way, refreshing the board (ie. an empty turnsLog) will not maintain the previous initialBoard.
export function setUpBoard({ turnsLog }) {
  let board = [...initialBoard.map((row) => [...row])];
  for (const turn of turnsLog) {
    const { row, col } = turn.square;
    board[row][col] = turn.player;
  }
  return board;
}

export function determineWinner({ turnsLog, board, playerNames }) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    console.log("combination: ", combination);
    const firstSquareSymbol = board[combination[0].row][combination[0].column];
    console.log("first: ", firstSquareSymbol);
    const secondSquareSymbol = board[combination[1].row][combination[1].column];
    const thirdSquareSymbol = board[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }
  const hasDraw = turnsLog.length === 9 && !winner;
  return [winner, hasDraw];
}
