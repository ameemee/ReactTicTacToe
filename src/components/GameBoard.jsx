import { useState } from "react";

export default function GameBoard({ handleSelectSquare, log, board }) {
  // goal: render the board dynamically

  // Setting the board with these states/setup is not desired;
  //    we will need virtually the same data to render the Log; a sibling component
  //    Thus, lift state up to parent App.jsx to share the state between GameBoard and Log (once)!
  // const [board, setBoard] = useState(initialBoard);
  // function handleSelectSquare(rowIndex, colIndex) {
  //   setBoard((currentBoard) => {
  //     const updatedBoard = [...currentBoard.map((rowArray) => [...rowArray])];
  //     updatedBoard[rowIndex][colIndex] = currentActivePlayer;
  //     return updatedBoard;
  //   });
  //   switchPlayer(); // changing to other person's turn.
  // }

  // instead, we seek to derive the game "board" from the state of the log array
  // via "deriving state from (state, or other) props!"

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleSelectSquare(rowIndex, colIndex)}
                  disabled={cell !== null}
                >
                  {cell}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
