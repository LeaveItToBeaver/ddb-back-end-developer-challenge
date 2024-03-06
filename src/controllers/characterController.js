const fs = require('fs/promises');
const path = require('path');
const CharacterRepository = require('../repositories/CharacterRepository.js');
const charactersFolder = path.join(__dirname, '../', 'data', 'charactersJSON');
const characterRepo = new CharacterRepository(charactersFolder);

const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
};

const getCharacter = async (id) => {
    await characterRepo.loadCharacters();
    return characterRepo.getCharacterById(id);
};

exports.getCharacterList = async (req, res) => {
    try {
        await characterRepo.loadCharacters();
        const characters = characterRepo.getAllCharacters();
        console.log(characters);
        await characterRepo.saveCharacters();
        res.json(characters);
    } catch (error) {
        handleError(error, res);
    }
};

exports.getCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await getCharacter(id);

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        res.json(character);
    } catch (error) {
        handleError(error, res);
    }
};

exports.dealDamage = async (req, res) => {
    const { id } = req.params;
    const { damageType, damageAmount } = req.body;

    if (damageAmount < 0) {
        return res.status(400).json({ error: `${damageAmount} is an invalid damage amount` });
    }

    try {
        const character = await getCharacter(id);

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        character.takeDamage(damageType, damageAmount);
        await characterRepo.saveCharacters();
        res.json({ message: 'Damage dealt successfully' });
    } catch (error) {
        handleError(error, res);
    }
};

exports.healCharacter = async (req, res) => {
    const { id } = req.params;
    const { healAmount } = req.body;

    if (healAmount <= 0) {
        return res.status(400).json({ error: 'Heal amount must be positive' });
    }

    try {
        const character = await getCharacter(id);

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        if (healAmount + character.currentHp > character.hitPoints) {
            return res.status(400).json({ error: 'Excessive healing' });
        }

        character.heal(healAmount);
        await characterRepo.saveCharacters();
        res.json({ message: 'Character healed successfully', character });
    } catch (error) {
        handleError(error, res);
    }
};

exports.addTempHp = async (req, res) => {
    const { id } = req.params;
    const { tempHpAmount } = req.body;

    try {
        const character = await getCharacter(id);

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        character.addTempHp(tempHpAmount);
        await characterRepo.saveCharacters();
        res.json({ message: 'Temporary Hit Points added successfully', character });
    } catch (error) {
        handleError(error, res);
    }
};