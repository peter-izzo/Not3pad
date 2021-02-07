/**
 * ////////////////
 * DEPENDENCIES
 * ////////////////
 */

 const express = require("express");
 const path = require("path");
 const fs = require("fs");
 const notes = require("./db/db.json");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname, "/public"));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

//routes to notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

//returns
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });