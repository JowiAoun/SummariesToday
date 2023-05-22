// --- Imports
// Modules
import express from "express";
import mongoose from 'mongoose';
import mongodbUri from "../config";


// --- Setting up the app and database
const app = express();
const db = mongoose.connect(mongodbUri)


// --- Routes
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// Start server
app.listen(5000);