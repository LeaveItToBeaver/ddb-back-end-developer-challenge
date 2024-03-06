const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const characterRoutes = require('./src/routes/characters');
const CharacterRepository = require('./src/repositories/CharacterRepository.js');
const characterRepo = new CharacterRepository(path.join(__dirname, 'data', 'briv.json'));

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    req.characterRepo = characterRepo;
    next();
});

app.use('/characters', characterRoutes);

module.exports = app;