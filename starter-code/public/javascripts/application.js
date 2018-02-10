/*
var map;
var currentMarker;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.415451988566375, lng: 356.29836363220215},
    zoom: 14
  });
}

function placeStation(latLng) {
  if (currentMarker !== undefined) {
    currentMarker.setMap(null);
  }
  currentMarker = new google.maps.Marker({
    position: latLng,
    map: map
  });
}
*/

function initialize() {
  var center = new google.maps.LatLng(40.41, 356.3);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var opt = {
    "styles" : [
      {textColor: "black", textSize: 15, height: 60, width: 60},
      {textColor: "black", textSize: 15, height: 70, width: 70},
      {textColor: "black", textSize: 15, height: 80, width: 80},
      {textColor: "black", textSize: 15, height: 90, width: 90},
      {textColor: "black", textSize: 15, height: 100, width: 100}
    ],
    "legend": {
      //"Broke" : "#FF0066",
      //"Bases" : "#FF9933",
      //"Bicycles anchored" : "#FFFF00" ,
      "no_available" : "#99FF99",
      "available" : "#66CCFF",
      //"Reservations" : "#A5A5A5"
    }
  };
  var markers = [];
  for (var i = 0; i < stations.length; i++) {
    var stationLat = stations[i].latitude;
    var stationLng = stations[i].longitude;
    var stationLatLng = new google.maps.LatLng(Number(stationLat), Number(stationLng));
    var no_available = stations[i].no_available;
    if (no_available = 1) {
      no_available = "no_available"
    } else {
      no_available = "available"
    }
    var marker = new google.maps.Marker({
      position: stationLatLng,
      title: no_available
      //no_available: no_available
    });
    markers.push(marker);
  }
  var markerCluster = new MarkerClusterer(map, markers,opt);
        }
