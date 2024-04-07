import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [turnsLog, setTurnsLog] = useState([]);
  const [currentActivePlayer, setCurrentActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setCurrentActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
    setTurnsLog((pastTurns) => {
      // note: don't use player: currentActivePlayer dependent on state val
      //    because the state value may not be updated immediately in future...
      //    instead, determine it via the last addition to the array.
      let lastPlayer =
        pastTurns.length > 0 && pastTurns[0].player === "X" ? "O" : "X";

      const updatedTurnsLog = [
        {
          square: { row: rowIndex, col: colIndex },
          player: lastPlayer,
        },
        ...pastTurns,
      ];

      return updatedTurnsLog;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            currentTurn={currentActivePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            currentTurn={currentActivePlayer === "O"}
          />
        </ol>
        <GameBoard handleSelectSquare={handleSelectSquare} log={turnsLog} />
        <Log />
      </div>
      LOG
    </main>
  );
}

export default App;
