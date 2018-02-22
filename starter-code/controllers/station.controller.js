const mongoose = require('mongoose');
const Station = require('../models/station.model');
const axios = require('axios');
//const cors = require('cors');

module.exports.index = (req, res, next) => {
  Station.find({}).then((stations) => {
    res.render("stations/index", {
      stations: stations
    });
  });
};