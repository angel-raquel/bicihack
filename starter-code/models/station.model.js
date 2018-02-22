const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required']
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  light: {
    type: Number,
    required: [true, 'Level of occupation is required'],
    enum: [0, 1, 2],
    default: 1
  },
  number: {
    type: String,
    default: ''
  },
  activate: {
    type: Number,
    enum: [0, 1],
    default: 1
  }, //Active station (0=Not active, 1=active)
  no_available: {
    type: Number,
    enum: [0, 1],
    default: 0
  }, //(0=available, 1=not available)
  total_bases: {
    type: Number,
    required: [true, 'Number of station bases is required']
  },
  dock_bikes: {
    type: Number,
    required: [true, 'Number of bicycles anchored is required']
  },
  free_bases: {
    type: Number,
    required: [true, 'Number of free anchors is required']
  },
  reservations_count: {
    type: Number,
    required: [true, 'Number of active reservations is required']
  },
  versionKey: false
});

module.exports = mongoose.model('Station', stationSchema);
