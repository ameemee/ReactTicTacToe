export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>GAME OVER</h2>
      {winner && <p>Winner is: {winner}</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}

// note: rematch means restarting the game.
//  effectively it means to reset the turnsLog to empty.
