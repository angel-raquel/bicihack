const Station = require('../models/station.model');

module.exports.index = (req, res) => {
  Station.find({}).then((stations) => {
    res.render("stations/index", {
      stations: stations
    });
  });
};
