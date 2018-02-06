const Station = require('../models/station.model');

module.exports.index = (req, res) => {
  /*Station.find({}).then((stations) => {
    res.render("index", {
      stations: stations,
      path: req.path
    });
  });*/
  res.send("HOLA")
};
