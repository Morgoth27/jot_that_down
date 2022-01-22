const uuid = require('uuid');
const express = require('express');
const { append } = require('vary');
const termData = ('')
const path = require('path');
const { ppid } = require('process');
const PORT = 3001;

app.use( express.static('public'));

app.get('/notes', (req, res) =>
{}
);

app.get('/api/notes', (req, res)=>
{}
);

append.listen(PORT, () =>
conesole.log(`Example app listening at http://localhost:${PORT}`));