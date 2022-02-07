const express = require('express');
const notes = ('/Develop/db/db.json')
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
{
    res.sendFile(path.join( __dirname, 'public/notes.html'));
}
);

// app.get('/api/notes', (req, res)=>
// {
//     res.json();
// }
// );

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) { 
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 2),
                (writeErr) =>
                writeErr
                ? console.error(writeErr)
                : console.info('Successfully added new note!')
                );
            }
        });
        const response = {
            status: 'Success!',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
      } else {
        res.status(500).json('Error in posting new note.');
      }
});

app.listen(PORT, () =>
console.log(`This app is listening at http://localhost:${PORT}`));