const express = require('express');
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


function read() {
    return readFileAsync('db/db.json', 'utf8')
}

function write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note))
}

app.get('/api/notes', (req, res) => {
    return read().then((notes) => {
        let readNotes = JSON.parse(notes) || [];
        return readNotes;
    })
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err))
    console.log("Request received....")
});

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

         read().then((notes) => {
            let readNotes = JSON.parse(notes) || [];

            readNotes.push(newNote)
            return write(readNotes)
        })
        .then((note) => res.json(note))
        .catch((err) => 
        res.status(500).json(err))
      } else {
        res.status(500).json('Error in posting new note.');
      }
});

app.delete('/api/notes/:id', (req, res) => {
    console.log('Note ' + req.params.id + ' has been deleted.');
    read().then((notes) => {
        let readNotes = JSON.parse(notes) || [];

        return readNotes;
    }).then((notes) => notes.filter((note) => note.id !== req.params.id))
    .then((filteredNotes) => write(filteredNotes))
    .then(() => res.json({ok: true}))
    .catch((err)=> res.status(500).json(err))

    // for (i = 0; i < notes.length; i++){
    //     if (notes[i].id === id){
    //         res.send(notes[i]);
    //         notes.splice(i,1);
    //         break;
    //     }
    // };

    // let jsonDb = path.join(__dirname, './db/db.json');
    // fs.writeFile(jsonDb, JSON.stringify(notes), (err) =>{
    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         console.log("Note deleted.")
    //     };
    // });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.listen(PORT, () =>
console.log(`This app is listening at http://localhost:${PORT}`));