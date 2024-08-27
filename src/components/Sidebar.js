import React from "react";

export default function Sidebar({
  notes,
  currentNote,
  setCurrentNoteId,
  newNote,
  handleClick,
}) {
  const noteElements = notes.map((note) => {
    const notesTitleSummary = note.body.split("\n")[0];
    return (
      <div key={note.id}>
        <div
          className={`title ${note.id === currentNote.id ? "selected-note" : ""}`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{notesTitleSummary}</h4>
          <button className="delete-btn" onClick={() => handleClick(note.id)}>
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    );
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
