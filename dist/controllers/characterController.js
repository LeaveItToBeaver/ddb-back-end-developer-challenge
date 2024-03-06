const fs = require('fs/promises');
const path = require('path');
const CharacterRepository = require('../repositories/CharacterRepository.js');
const characterRepo = new CharacterRepository(path.join(__dirname, '../', 'data', 'briv.json'));
exports.getCharacter = async (req, res) => {
  try {
    await characterRepo.loadCharacters();
    const {
      id
    } = req.params;
    const character = characterRepo.getCharacterById(id);
    if (!character) {
      return res.status(404).send('Character not found');
    }
    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
exports.dealDamage = async (req, res) => {
  const {
    id,
    damageType,
    damageAmount
  } = req.body;
  try {
    await characterRepo.loadCharacters();
    const character = characterRepo.getCharacterById(id);
    if (!character) {
      return res.status(404).json({
        error: 'Character not found'
      });
    }
    character.takeDamage(damageType, damageAmount);
    await characterRepo.saveCharacters();
    res.json({
      message: 'Damage dealt successfully',
      character
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
exports.healCharacter = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    healAmount
  } = req.body;
  if (healAmount <= 0) {
    return res.status(400).json({
      error: 'Heal amount must be positive'
    });
  }
  try {
    await characterRepo.loadCharacters();
    const character = characterRepo.getCharacterById(id);
    if (!character) {
      return res.status(404).json({
        error: 'Character not found'
      });
    }
    character.heal(healAmount);
    await characterRepo.saveCharacters();
    res.json({
      message: 'Character healed successfully',
      character
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
exports.addTempHp = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    tempHpAmount
  } = req.body;
  try {
    await characterRepo.loadCharacters();
    const character = characterRepo.getCharacterById(id);
    if (!character) {
      return res.status(404).json({
        error: 'Character not found'
      });
    }
    character.addTempHp(tempHpAmount);
    await characterRepo.saveCharacters();
    res.json({
      message: 'Temporary Hit Points added successfully',
      character
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};