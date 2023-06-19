// --- Imports
// Modules
import express, { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import cors from "cors";
// Utility
import mongodbUri from "../config";
import UserModel from "./schemas/User";
import getUserByUsername from "./utility";

// --- Variables
const PORT = 5000;

// --- Set up the app and database
// App
const app = express();
// Database
mongoose.connect(mongodbUri);
// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// --- Interfaces
interface Book {
  _id: string;
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

// --- Routes
//TODO: Fetch this user's profile by session's username
app.get("/profile", (req: Request, res: Response) => {
  getUserByUsername(req, res, (user: User) => {
    // Code to execute after getting user
    res.json(user);
  });
});

// Fetch a user by user ID in request parameters
app.get("/users/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await UserModel.findOne({ _id: userId });
  try {
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a user by user ID in request parameters
app.delete("/users/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const response = await UserModel.deleteOne({
    _id: userId,
  })
    .then(() => {
      res.send("Successfully deleted user!"); //TODO: check if user was actually deleted to send appropriate message
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

// Get all books of a user by user ID
app.get("/books", async (req: Request, res: Response) => {
  const username_ = "John Doe"; //TODO: Change to session username
  const user = await UserModel.findOne({ username: username_ });
  try {
    const books = user?.books;
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get the book with the specified ID
app.get("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await UserModel.findOne(
      { "books._id": bookId },
      { "books.$": 1 }
    );
    if (book && book.books.length > 0) {
      res.json(book.books[0]);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Deletes a book by ID for the user with the specified username from raw JSON from DB
app.delete("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  await UserModel.updateOne(
    { "books._id": bookId },
    { $pull: { books: { _id: bookId } } }
  )
    .then(() => {
      res.send("Successfully deleted book!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

// Create a new user from raw JSON and saves to DB
app.post("/createNewUser", async (req: Request, res: Response) => {
  // Mark the anonymous function as async
  try {
    const user = new UserModel(req.body);
    await user.save(); // Wait for the save operation to complete

    res.send("Successfully created the user!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new book for a user from raw JSON and saves to DB
app.post("/createNewBook", (req: Request, res: Response) => {
  getUserByUsername(req, res, async (user: User) => {
    // Mark the anonymous function as async
    // Code to execute after getting user
    req.body.age = new Date().getTime();
    user.books.push(req.body);

    try {
      const savedUser = await user.save(); // Wait for the save operation to complete

      res.json(savedUser.books[savedUser.books.length - 1]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
});

// --- Start server
app.listen(PORT);
