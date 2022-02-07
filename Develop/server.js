const express = require('express');
// const termData = ('./terms.json')
const path = require('path');

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

app.post('/api/notes', (req, res) => 
{
    res.json('a message')
})

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`));