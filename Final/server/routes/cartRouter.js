const express = require('express');
const controller = require('../controllers/cartController');

const router = express.Router();
router.post('/:username', controller.create);
router.get('/:username', controller.get);
router.put('/:username', controller.update);
router.delete('/:username', controller.delete);

module.exports = router;
