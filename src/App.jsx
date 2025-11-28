import Player from "./Player";
import GameBoard from "./GameBoard";
import Log from "./Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function driveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [playerName, setPlayerName] = useState({
    X: "player 1",
    O: "player 2",
  });
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = driveActivePlayer(gameTurns);

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner = null;

  for (let combination of WINNING_COMBINATIONS) {
    const first_element = gameBoard[combination[0].row][combination[0].column];
    const second_element = gameBoard[combination[1].row][combination[1].column];
    const third_element = gameBoard[combination[2].row][combination[2].column];
    if (
      first_element &&
      first_element === second_element &&
      first_element === third_element
    ) {
      winner = playerName[first_element];
    }
  }
  const drawPlayer = !winner && gameTurns.length == 9;
  function handlePlayerSelector(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = driveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerName(symbol, newName) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangePlayerName={handlePlayerName}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangePlayerName={handlePlayerName}
          />
        </ol>
        {(winner || drawPlayer) && (
          <GameOver player={winner} rematch={handleRestart} />
        )}
        <GameBoard
          onSelectChange={handlePlayerSelector}
          BoardGame={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
