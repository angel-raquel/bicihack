const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../configs/passport.config');

router.get('/:id', secure.isMe, userController.profile);
router.get('/edit/:id', secure.isMe, userController.edit);
router.post('/edit/:id', secure.isMe, userController.doEdit);

module.exports = router;