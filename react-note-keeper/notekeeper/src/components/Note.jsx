import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  // creates an individual note
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.onDelete(props.title);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
export default Note;
