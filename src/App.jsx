import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import GameOver from "./components/GameOver";
import { determineWinner, setUpBoard } from "./utils";

function deriveActivePlayer(log) {
  return log.length > 0 && log[0].player === "X" ? "O" : "X";
}

function App() {
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  // turnsLog is stacked (turnsLog[0] is newest)
  //  log[0] holds who JUST went.
  //  eg. if X just went, then it's O's turn next.
  const [turnsLog, setTurnsLog] = useState([]);
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
  let board = setUpBoard({ turnsLog });

  // checking if there is a winner each time the log changes
  let [winner, hasDraw] = determineWinner({ turnsLog, board, playerNames });

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
