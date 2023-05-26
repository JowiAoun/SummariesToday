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
const db = mongoose.connect(mongodbUri);
// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// --- Interfaces
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

// --- Routes
// Fetch a profile by username
app.get("/profile", (req: Request, res: Response) => {
  getUserByUsername(req, res, (user: User) => {
    // Code to execute after getting user
    res.send(user);
  });
});

// Fetch books for a user by username
app.get("/books", (req: Request, res: Response) => {
  getUserByUsername(req, res, (user: User) => {
    // Code to execute after getting user
    let books: Book[] = user.books;
    res.send(books);
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
      await user.save(); // Wait for the save operation to complete

      res.send("Successfully created the new book!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
});

// Deletes a user with the specified username from raw JSON from DB
app.post("/deleteUser", (req: Request, res: Response) => {
  UserModel.deleteOne({ username: req.body.username })
    .then(() => {
      res.send("Successfully deleted the user!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

// Deletes a book by ID for the user with the specified username from raw JSON from DB
app.post("/deleteBook", (req: Request, res: Response) => {
  UserModel.updateOne(
    { username: req.body.username },
    { $pull: { books: { _id: req.body.id_ } } }
  )
    .then(() => {
      res.send("Successfully deleted the book!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

// --- Start server
app.listen(PORT);
