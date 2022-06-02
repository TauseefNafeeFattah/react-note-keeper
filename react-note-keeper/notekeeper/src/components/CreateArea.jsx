import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  // creates the input area
  const [isExpanded, setExpanded] = useState(false);

  var id = props.length + 1;
  const [note, setNote] = useState({
    key: id,
    title: "",
    content: ""
  });

  function expand() {
    // expands the input area after the click on the title
    setExpanded(true);
  }

  function changeNote(event) {
    // changes the value of the note 
    const { name, value } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  function addButton(event) {
    // sends the note data to App.js file so that we can add the note to the database
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            onChange={changeNote}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        )}
        <textarea
          onClick={expand}
          onChange={changeNote}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={note.content}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={addButton}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
