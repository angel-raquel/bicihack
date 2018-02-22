Station = require('../models/station.model');
const axios = require('axios');

module.exports.getBicimadStations = () => {
    const bicimadUser = 'WEB.SERV.mouyaq@gmail.com';
    const bicimadKey = 'E7FD5DC1-0BAE-402A-BCCC-44732DD5309A';
    const url = `https://rbdata.emtmadrid.es:8443/BiciMad/get_stations/${bicimadUser}/${bicimadKey}/`;
    axios.get(url)
      .then(function (response) {
        var data = JSON.parse(response.data.data);
        data.stations.forEach(dataStation => {
          Station.findOne({id: dataStation.id})
            .then(station => {
              if(station != null) {
                Station.update({ id: station.id }, dataStation)
                  .then(() => {
                  })
                  .catch((error) => {
                  })
              }
              else {
                station = new Station(dataStation)
                station.save();
              }
            })
            .catch(error => {
              return;
            })
        })
        return;
      })
      .catch(function (error) {
        return
      });
}