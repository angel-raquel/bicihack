const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/:id', userController.profile);
router.get('/edit/:id', userController.edit);
router.post('/edit/:id', userController.doEdit);

module.exports = router;