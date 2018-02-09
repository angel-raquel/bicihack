const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../middleware/security.middleware');

router.get('/:id', secure.isMyProfile, userController.profile);
router.get('/edit/:id', secure.isMyProfile, userController.edit);
router.post('/edit/:id', secure.isMyProfile, userController.doEdit);

module.exports = router;