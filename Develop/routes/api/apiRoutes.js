const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const notes = JSON.parse(data);
        res.json(notes);
    });
});

router.post('/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const notes = JSON.parse(data);
        const newNote = req.body;

        newNote.id = uuidv4();
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json(newNote);
        });
    });
});

router.delete('/notes/:id', (req, res) => {
    // Read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const notes = JSON.parse(data);
        const noteId = req.params.id;

        // Find the index of the note with the specified ID
        const noteIndex = notes.findIndex(note => note.id === noteId);

        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Remove the note from the array
        notes.splice(noteIndex, 1);

        // Write the updated notes array to the db.json file
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.sendStatus(204); // Send a success status code indicating successful deletion
        });
    });
});

module.exports = router;