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
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//routes to notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//reads db.json and returns notes as json
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Should receive a new note to save on the request body, 
//add it to the `db.json` file, and then return
//the new note to the client.
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    newNote.id = notes.length + 1;
    // console.log(newNote);

    //add new note to 'notes' array
    notes.push(newNote);
    let dbAdd = JSON.stringify(notes);

    fs.writeFileSync("./db/db.json",
                    dbAdd, function(err) {
                        if (err) {
                            throw err;
                        }
                    });

    //return new notes
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.delete("/api/notes/:id", function (req, res) {
    let deleteNote = req.params.id;
    console.log(deleteNote); 
    console.log(typeof deleteNote);

    //if deleteNote matches if of chosen note
    //deletes item from list
    for (let i = 0; i < notes.length; i++) {
        if (deleteNote == "undefined") {
            notes.splice(i, 1)
        }

        else if (deleteNote === (notes[i].id).toString()) {
            notes.splice(i, 1)
        }
    }

    for (let i = 0; i < notes.length; i++) {
        notes[i].id = i + 1
        
    }

    let newDB = JSON.stringify(notes)
    fs.writeFileSync("./db/db.json", newDB, function(err) {
        if (err) {
            throw err
        }
    });

    res.sendFile(path.join(__dirname, "/public/notes.html"));
    

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });