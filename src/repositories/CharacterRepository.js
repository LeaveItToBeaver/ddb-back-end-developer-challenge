const fs = require('fs/promises');
const path = require('path');
const CharacterModel = require('../data/models/CharacterModel.js');
const { v4: uuidv4 } = require('uuid');

class CharacterRepository {
    constructor(folderPath) {
        this.folderPath = folderPath;
        this.characters = [];
    };

    async loadCharacters() {
        try {
            const files = await fs.readdir(this.folderPath);
            const jsonFiles = files.filter(file => path.extname(file) === '.json');

            const characterPromises = jsonFiles.map(async file => {
                const filePath = path.join(this.folderPath, file);
                const data = await fs.readFile(filePath, 'utf8');
                const characterData = JSON.parse(data);
                return new CharacterModel(characterData);
            });

            this.characters = await Promise.all(characterPromises);
        } catch (error) {
            console.error('Error loading characters:', error);
            throw error;
        }
    }

    async saveCharacters() {
        const savePromises = this.characters.map(async (character) => {
            const fileName = `${character.name}.json`;
            const filePath = path.join(this.folderPath, fileName);
            const data = JSON.stringify(character, null, 2);
            await fs.writeFile(filePath, data, 'utf8');
        });

        await Promise.all(savePromises);
    }

    getAllCharacters() {
        return this.characters;
    }

    getCharacterById(id) {
        return this.characters.find(character => character.id === id);
    };
}

module.exports = CharacterRepository;