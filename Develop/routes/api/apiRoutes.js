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
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const notes = JSON.parse(data);
        const noteId = req.params.id;

        
        const noteIndex = notes.findIndex(note => note.id === noteId);

        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        
        notes.splice(noteIndex, 1);

        
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.sendStatus(204);
        });
    });
});

module.exports = router;