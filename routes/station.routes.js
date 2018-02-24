const express = require('express');
const stationController = require('../controllers/station.controller');
const secure = require('../middleware/security.middleware');

const router = express.Router();

router.get('/', stationController.index);
router.get('/getStations', stationController.getStations);
module.exports = router;
