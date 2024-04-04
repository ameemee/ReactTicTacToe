import { useState } from "react";

export default function Player({ initialName, symbol, currentTurn }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // console.log("player name: " + playerName);
  // console.log("initial player name: " + initialName);

  function handleEditClick() {
    setIsEditing((currentIsEditingVlue) => !currentIsEditingVlue);
  }

  function handleChange(changeEvent) {
    // console.log("event: ", changeEvent);
    // onChange returns an event object.
    // the 'target' value is "input" (the element that triggered the event)
    // the 'value' value is the value of the input field (the new text in the input field)
    setPlayerName(changeEvent.target.value); // will overwrite the value attribute of the input field (initially value={playerName})
  }

  let editedPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editedPlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    // onChange is called whenever there's a change.
    // this pattern is called "two way binding" because we get a
    //    value OUT of the input field (via onChange) and we feed it back
    //    IN to the input field (via value={playerName})
  }

  const editButtonText = isEditing ? "Save" : "Edit";

  return (
    <li className={currentTurn ? "active" : undefined}>
      <span className="player">
        {editedPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{editButtonText}</button>
    </li>
  );
}
