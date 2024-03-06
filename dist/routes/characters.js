const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController.js');
router.post('/characters/:id/damage', characterController.dealDamage);
router.post('/characters/:id/heal', characterController.healCharacter);
router.post('/characters/:id/temp-hp', characterController.addTempHp);
module.exports = router;