const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../middleware/security.middleware');

router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);
router.get('/login', authController.login);
router.post('/login', authController.doLogin);
router.get('/logout', secure.isAuthenticated, authController.logout);
router.post('/isLogged', authController.isLogged);

module.exports = router;