// --- Imports
// Modules
import express from "express";
import mongoose, { Document } from "mongoose";
// Others
import mongodbUri from "../config";
import testCreateUser from "./utility";
import UserModel from "./schemas/User";

// --- Variables
const PORT = 5000;

// --- Setting up the app and database
const app = express();
app.use(express.json());
const db = mongoose.connect(mongodbUri);

// --- Functions
interface Book {
  title: string;
  text: string;
  age: number;
}

interface User extends Document {
  username: string;
  email: string;
  password: string;
  age: number;
  country: string;
  settings: string;
  books: Book[];
}

async function findUser(u: string) {
  try {
    return await UserModel.findOne({ username: u });
  } catch (err) {
    return err;
  }
}

// --- Routes
// Main page
app.get("/testCreateUser", (req, res) => {
  testCreateUser();
  res.send("Created user!");
});

app.get("/books", (req, res) => {
  // TODO: Change username to session's storage username to refine search
  findUser("John Doe")
    .then((u) => {
      let user: User = u as User; // Use type assertion to specify the type of `u`
      let books: Book[] = user.books;
      res.send(books[1]); // Send the user object as a response
    })
    .catch((error) => {
      console.error(error); // Handle any errors that occur during the promise chain
      res.status(500).send("Internal Server Error");
    });
});

app.get("/profile", (req, res) => {
  // TODO: Change username to session's storage username to refine search
  findUser("John Doe")
    .then((u) => {
      let user: User = u as User; // Use type assertion to specify the type of `u`
      res.send(user); // Send the user object as a response
    })
    .catch((error) => {
      console.error(error); // Handle any errors that occur during the promise chain
      res.status(500).send("Internal Server Error");
    });
});

app.get("/book/:bookId", (req, res) => {
  const { bookId } = req.params;
});

app.post("/createBook", (req, res) => {
  findUser("John Doe")
    .then((u) => {
      let user: User = u as User; // Use type assertion to specify the type of `u`
      user.books.push(req.body);
      user.save();
      res.send("Successfully added the book!"); // Send the user object as a response
    })
    .catch((error) => {
      console.error(error); // Handle any errors that occur during the promise chain
      res.status(500).send("Internal Server Error");
    });
});

// Start server
app.listen(PORT);
