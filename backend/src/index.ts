// --- Imports
// Modules
import express, { Request, Response } from "express";


// --- Setting up the app
const app = express();


// --- Routes
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// Start server
app.listen(5000);