// --- Imports
import { Document } from "mongoose";
import UserModel from "./schemas/User";
import { Request, Response } from "express";

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

// --- Functions
function getUserByUsername(req: Request, res: Response, callback: Function) {
  const username = req.body.username;
  UserModel.findOne({ username })
    .then((u) => {
      if (!u) {
        res.status(404).send("User not found");
        return;
      }

      let user = u as User;
      callback(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
}

// --- Export
export default getUserByUsername;
