class CharacterModel {
  constructor(data) {
    this.name = data.name;
    this.level = data.level;
    this.hitPoints = data.hitPoints;
    this.classes = data.classes;
    this.stats = data.stats;
    this.items = data.items;
    this.defenses = data.defenses;
    this.tempHp = 0;
  }
  totalConstitution() {
    const baseConstitution = this.stats.constitution;
    const constitutionModifier = this.items.filter(item => item.modifier.affectedObject === 'stats' && item.modifier.affectedValue === 'constitution').reduce((total, item) => total + item.modifier.value, 0);
    return baseConstitution + constitutionModifier;
  }
  takeDamage(damageType, amount) {
    if (this.immunities.includes(damageType)) {
      // No damage taken if immune
      return;
    }
    let finalDamage = amount;
    if (this.resistances.includes(damageType)) {
      finalDamage = Math.floor(amount / 2); // Half damage if resistant
    }
    if (this.tempHp > 0) {
      const damageToTempHp = Math.min(finalDamage, this.tempHp);
      this.tempHp -= damageToTempHp;
      finalDamage -= damageToTempHp;
    }
    this.currentHp = Math.max(this.currentHp - finalDamage, 0); // Ensure HP doesn't go below 0
  }
  addTempHp(amount) {
    this.tempHp = Math.max(this.tempHp, amount);
  }
}
module.exports = CharacterModel;