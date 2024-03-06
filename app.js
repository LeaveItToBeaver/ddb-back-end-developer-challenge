const fs = require('fs');
const characterData = JSON.parse(fs.readFileSync('./data/briv.json', 'utf8'));
const express = require('express');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/characters');

const app = express();

app.use(bodyParser.json());

app.use('/characters', characterRoutes);

//This code opens on port 3000 and if port 3000 is not available, open the next available port.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


module.exports = app;