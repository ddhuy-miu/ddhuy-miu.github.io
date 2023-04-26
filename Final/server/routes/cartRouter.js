const express = require('express');
const controller = require('../controllers/cartController');

const router = express.Router();
router.post('/', controller.create);
router.post('/checkout', controller.checkout);
router.get('/', controller.get);
router.put('/', controller.update);
router.delete('/', controller.delete);

module.exports = router;
