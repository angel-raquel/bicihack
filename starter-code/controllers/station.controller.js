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

module.exports.getStations = (req, res, next) => {
  Station.find({})
  .then(station => {
    res.send(station)
  })
  .catch(error => next(error))
};

module.exports.getBiciMadStations = (req, res, next) => {
  const bicimadUser = 'WEB.SERV.mouyaq@gmail.com';
  const bicimadKey = 'E7FD5DC1-0BAE-402A-BCCC-44732DD5309A';
  const url = `https://rbdata.emtmadrid.es:8443/BiciMad/get_stations/${bicimadUser}/${bicimadKey}/`;
  axios.get(url)
  .then(function (response) {
    res.send(response.data);
  })
  .catch(function (error) {
    res.send(error);
  });
};