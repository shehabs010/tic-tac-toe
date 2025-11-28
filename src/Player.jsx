import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangePlayerName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleName(e) {
    setPlayerName(e.target.value);
  }
  function editButton() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        defaultValue={playerName}
        onChange={handleName}
      />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editButton}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
