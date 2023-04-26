const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();
router.post('/', controller.create);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

router.get('/', controller.list);
router.get('/:username', controller.get);

router.put('/:username', controller.update);

router.delete('/:username', controller.delete);

module.exports = router;
