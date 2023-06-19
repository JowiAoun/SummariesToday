import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

type TBook = {
  title: string;
  _id: string;
};

function App() {
  // --- Hooks
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [books, setBooks] = useState<TBook[]>([]);

  // --- Event handlers
  async function handleCreateBook(e: React.FormEvent) {
    e.preventDefault(); // makes the page not refresh on submit
    // create the post request to talk to the backend
    const response = await fetch("http://localhost:5000/createNewBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "John Doe", //TODO: Change to session username
        title: title,
        text: text,
      }),
    });
    const book = await response.json();
    setBooks([...books, book]);

    setTitle("");
    setText("");
  }

  async function handleDeleteBook(bookId: string) {
    // create the post request to talk to the backend
    await fetch(`http://localhost:5000/books/${bookId}`, {
      method: "DELETE",
    });
    setBooks(books.filter((book) => book._id !== bookId));
  }

  // Loads all books
  useEffect(() => {
    // We create an async function and call it only
    // because useEffect() does not allow async arrow functions
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:5000/books", {
          method: "GET",
        });
        if (response.ok) {
          const newBooks = await response.json();
          setBooks(newBooks);
        } else {
          throw new Error("Failed to fetch books");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks();
  }, []);

  // --- Create component
  return (
    <>
      <ul className="books">
        {books.map((book) => (
          <li key={book._id}>
            <button onClick={() => handleDeleteBook(book._id)}>X</button>
            <Link to={`books/${book._id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateBook}>
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
    </>
  );
}

export default App;
