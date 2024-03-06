const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.post('/:id/damage', characterController.dealDamage);
router.post('/:id/heal', characterController.healCharacter);
router.post('/:id/temp-hp', characterController.addTempHp);

module.exports = router;