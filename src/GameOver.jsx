export default function GameOver({ player, rematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {player && <p>{player} win!</p>}
      {!player && <p> Game Draw</p>}
      <button onClick={rematch}>Rematch</button>
    </div>
  );
}
