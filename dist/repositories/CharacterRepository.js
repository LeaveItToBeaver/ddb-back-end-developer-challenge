const fs = require('fs/promises');
const path = require('path');
const CharacterModel = require('../data/models/CharacterModel.js');
const {
  v4: uuidv4
} = require('uuid');
class CharacterRepository {
  constructor(filePath) {
    this.filePath = filePath;
    this.characters = [];
  }
  async loadCharacters() {
    const data = await fs.readFile(this.filePath, 'utf8');
    const charactersData = JSON.parse(data);
    if (Array.isArray(charactersData)) {
      this.characters = charactersData.map((characterData, index) => {
        const id = uuidv4();
        return {
          id,
          ...new CharacterModel(characterData)
        };
      });
    } else {
      const id = uuidv4();
      this.characters = [{
        id,
        ...new CharacterModel(charactersData)
      }];
    }
  }
  async saveCharacters() {
    const data = JSON.stringify(this.characters.map(({
      id,
      ...character
    }) => character), null, 2);
    await fs.writeFile(this.filePath, data, 'utf8');
  }
  getCharacterById(id) {
    return this.characters.find(character => character.id === id);
  }
}
module.exports = CharacterRepository;