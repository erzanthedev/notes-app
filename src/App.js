import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || [], // "[]" is acting as a fallback in the case where localStorage returns undefined
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || "",
  );

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  // Update LocalStorage only when notes array changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // Find and update notes with new text
    const updatedNotes = notes.map((note) => {
      return note.id === currentNoteId ? { ...note, body: text } : note;
    });

    // Find the modified Notes
    const modifiedNote = updatedNotes.find((note) => note.id === currentNoteId);

    // Filter out modified notes from updated notes
    const filteredNotes = updatedNotes.filter(
      (note) => note.id !== currentNoteId,
    );
    setNotes([modifiedNote, ...filteredNotes]);
  }

  const deleteNote = (event, noteId) => {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            handleClick={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
