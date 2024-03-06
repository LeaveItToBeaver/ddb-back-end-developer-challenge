const fs = require('fs');
const characterData = JSON.parse(fs.readFileSync('./data/briv.json', 'utf8'));

exports.dealDamage = (req, res) => {
    const { id } = req.params;
    const { damageType, damageAmount } = req.body;

    // Find the character by ID
    const character = characterData.find(char => char.filename === id);

    if (!character) {
        return res.status(404).json({ error: 'Character not found' });
    }

    // Check if the character is resistant or immune to the damage type
    const isResistant = character.resistances.includes(damageType);
    const isImmune = character.immunities.includes(damageType);

    if (isImmune) {
        return res.json({ message: 'Character is immune to the damage type' });
    }

    const finalDamage = isResistant ? Math.floor(damageAmount / 2) : damageAmount;

    // Update the character's HP
    character.currentHp -= finalDamage;

    res.json({ message: 'Damage dealt successfully' });
};

exports.healCharacter = (req, res) => {
    const { id } = req.params;
    const { healAmount } = req.body;
    // Logic to heal the character by the specified healAmount
    // Update characterData accordingly
    res.json({ message: 'Character healed successfully' });
};

exports.addTempHp = (req, res) => {
    const { id } = req.params;
    const { tempHpAmount } = req.body;
    // Logic to add temporary Hit Points to the character
    // Update characterData accordingly
    res.json({ message: 'Temporary Hit Points added successfully' });
};