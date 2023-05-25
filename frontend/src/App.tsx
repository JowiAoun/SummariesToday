import React, { useState } from "react";
import "./App.css";

function App() {
  // --- Hooks
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // --- Event handlers
  async function handleCreateDocument(e: React.FormEvent) {
    e.preventDefault(); // makes the page not refresh on submit
    // create the post request to talk to the backend
    await fetch("http://localhost:5000/createNewBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    });
    setTitle("");
    setText("");
  }

  // --- Create component
  return (
    <form onSubmit={handleCreateDocument}>
      <input
        placeholder="Title"
        id="book-title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <input
        placeholder="Text"
        id="book-text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
      />
      <button>Create Book</button>
    </form>
  );
}

export default App;
