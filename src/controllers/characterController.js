const fs = require('fs/promises');
const path = require('path');
const CharacterRepository = require('../repositories/CharacterRepository.js');
const charactersFolder = path.join(__dirname, '../', 'data', 'charactersJSON');
const characterRepo = new CharacterRepository(charactersFolder);


exports.getCharacterList = async (req, res) => {
    try {
        await characterRepo.loadCharacters();
        const characters = characterRepo.getAllCharacters();
        console.log(characterRepo.getAllCharacters());
        await characterRepo.saveCharacters();

        res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: process.env.NODE_ENV === 'development' ? error.message : undefined });

    }
};

exports.getCharacter = async (req, res) => {
    try {
        await characterRepo.loadCharacters();
        console.log(characterRepo.getAllCharacters());

        const { id } = req.params;
        const character = characterRepo.getCharacterById(id);

        if (!character) {
            return res.status(404).send({error: 'Character not found', details: process.env.NODE_ENV === 'development' ? error.message : undefined});
        }

        res.json(character);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: process.env.NODE_ENV === 'development' ? error.message : undefined });

    }
};

exports.dealDamage = async (req, res) => {
    const { id } = req.params;
    const { damageType, damageAmount } = req.body;

    if (damageAmount < 0){
        return res.status(400).json({ error: `${damageAmount} is an invalid damange amount` })
    }

    try {
        await characterRepo.loadCharacters();
        const character = characterRepo.getCharacterById(id);

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        character.takeDamage(damageType, damageAmount);

        await characterRepo.saveCharacters();

        res.json({ message: 'Damage dealt successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
    }
};

exports.healCharacter = async (req, res) => {
    const { id } = req.params;
    const { healAmount } = req.body;

    if (healAmount <= 0) {
        return res.status(400).json({ error: 'Heal amount must be positive' });
    }

    try {
        await characterRepo.loadCharacters();
        const character = characterRepo.getCharacterById(id);

        const healthCheck = healAmount + character.currentHp;

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        if (healthCheck > character.hitPoints){
            return res.status(400).json({ error: 'Excessive healing' })
        }
        character.heal(healAmount);

        await characterRepo.saveCharacters();

        res.json({ message: 'Character healed successfully', character: character });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
    }
};

exports.addTempHp = async (req, res) => {
    const { id } = req.params;
    const { tempHpAmount } = req.body;

    try {
        await characterRepo.loadCharacters();
        const character = characterRepo.getCharacterById(id);

        if (!character) {
            return res.status(404).json({ error: 'Character not found', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
        }

        character.addTempHp(tempHpAmount);

        await characterRepo.saveCharacters();

        res.json({ message: 'Temporary Hit Points added successfully', character });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: process.env.NODE_ENV === 'development' ? error.message : undefined });

    }
};