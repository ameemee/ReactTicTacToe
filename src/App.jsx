import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

function deriveActivePlayer(log) {
  // log[0] holds who JUST went.
  // eg. if X just went, then it's O's turn next.
  return log.length > 0 && log[0].player === "X" ? "O" : "X";
}

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [turnsLog, setTurnsLog] = useState([]); // turnsLog is stacked (turnsLog[0] is newest)
  const currentActivePlayer = deriveActivePlayer(turnsLog);

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((previousNames) => {
      return {
        ...previousNames,
        [symbol]: newName,
      };
    });
  }

  // setting up the board each time the log changes
  //  note: ensure that board is a COPY of initialBoard, not a reference to it.
  //        this way, refreshing the board (ie. an empty turnsLog) will not maintain the previous initialBoard.
  let board = initialBoard.map((row) => [...row]);
  for (const turn of turnsLog) {
    const { row, col } = turn.square;
    board[row][col] = turn.player;
  }

  // checking if there is a winner each time the log changes
  let winner;
  const hasDraw = turnsLog.length === 9 && !winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].column];
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

  function handleSelectSquare(rowIndex, colIndex) {
    setTurnsLog((pastTurns) => {
      // note: don't use player: currentActivePlayer dependent on state val
      //    because the state value may not be updated immediately in future...
      //    instead, determine it via the last addition to the array.
      let whoJustPlayed = deriveActivePlayer(pastTurns);

      const updatedTurnsLog = [
        {
          square: { row: rowIndex, col: colIndex },
          player: whoJustPlayed,
        },
        ...pastTurns,
      ];

      return updatedTurnsLog;
    });
  }

  function handleRestart() {
    setTurnsLog([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            currentTurn={currentActivePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            currentTurn={currentActivePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          log={turnsLog}
          board={board}
        />
      </div>
      <Log log={turnsLog} />
    </main>
  );
}

export default App;
