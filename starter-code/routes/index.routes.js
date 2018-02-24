const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', indexController.index);
//router.get('/images/m/');

module.exports = router;
