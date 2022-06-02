import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

import CreateArea from "./CreateArea";

function App() {
  const [noteList, setNoteList] = useState([{}]);

  useEffect(()=>{
    fetch("/notes")
    .then((res) => res.json())
    .then((data)=>setNoteList(data));
  })

  function onAdd(note) {
    // add the note to the database

    fetch("/notes", {
        method: "POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "title": note.title,
            "content": note.content
        })
    });
  }

  function onDelete(title) {
    // delete a note to the database
    const deleteRequestOption = {
      method: 'DELETE',
    };
    fetch("/notes/"+title, deleteRequestOption)
    .then((res) => res.json())
    .then((data)=>console.log(data));
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={onAdd} length={noteList.length} />
      {noteList.map((note) => (
        <Note
          onDelete={onDelete}
          id={note.key}
          key={note.key}
          title={note.title}
          content={note.content}
        />
      ))}
      <Footer />
    </div>
  );
}
export default App;
