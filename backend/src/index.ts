// --- Imports
// Modules
import express from "express";
import mongoose from 'mongoose';
// Others
import mongodbUri from "../config";
import testCreateUser from "./utility";
import User from "./schemas/User";


// --- Variables
const PORT = 5000;


// --- Setting up the app and database
const app = express();
app.use(express.json());
const db = mongoose.connect(mongodbUri);


// --- Routes
// Main page
app.get('/testCreateUser', (req, res) => {
    testCreateUser();
    res.send("Created user!");
});

app.get('/documents', (req, res) => {
    async function findUser() {
        try {
            // Get query parameters
            const username = "John Doe"; // TODO: Change to session's storage username to refine search
            // Query DB
            const user = await User.findOne({ username: username });
            const documents = user?.documents
            // Handle user
            res.send(user);
        } catch (err) {
            // Handle error
            res.send(err);
        }
      }
      findUser();
});

app.get('/documents/:documentId', (req, res) => {
    const { documentId } = req.params;
});


// Start server
app.listen(PORT);