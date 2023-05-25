import React, { useState } from "react";
import "./App.css";

function App() {
  // --- Hooks
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // --- Event handlers
  function handleCreateDocument(e: React.FormEvent) {
    e.preventDefault(); // makes the page not refresh on submit
    // create the post request to talk to the backend
    fetch("http://localhost:5000/document", {
      method: "POST",
      body: JSON.stringify({
        title,
        text,
      }),
    });
  }

  // --- Create component
  return (
    <>
      <form onSubmit={handleCreateDocument}>
        <input
          placeholder="Title"
          id="document-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <input
          placeholder="Text"
          id="document-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Document</button>
      </form>
    </>
  );
}

export default App;
