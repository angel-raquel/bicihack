var map;
var infoWindow;

function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(40.415451988566375,356.29836363220215),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   map = new google.maps.Map(document.getElementById('map'), mapOptions);

   // a new Info Window is created
   infoWindow = new google.maps.InfoWindow();

   // Event that closes the Info Window with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });


   // Finally displayMarkers() function is called to begin the markers creation

   var markerCluster = new MarkerClusterer(map, displayMarkers(),
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}
//google.maps.event.addDomListener(window, 'load', initialize);

function displayMarkers(){
  var markers = [];
   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();

   // for loop traverses markersData array calling createMarker function for each marker
   for (var i = 0; i < stations.length; i++){
      var latlng = new google.maps.LatLng(stations[i].latitude, stations[i].longitude);
      var name = stations[i].name;
      var dock_bikes = stations[i].dock_bikes;
      var free_bases = stations[i].free_bases;
      var reservations_count = stations[i].reservations_count;


      markers.push(createMarker(latlng, name, dock_bikes, free_bases, reservations_count));

      // marker position is added to bounds variable
      bounds.extend(latlng);
   }

   // Finally the bounds variable is used to set the map bounds
   // with fitBounds() function
   map.fitBounds(bounds);
   return markers
}

function createMarker(latlng, name, dock_bikes, free_bases, reservations_count){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name
   });

   // This event expects a click on a marker
   // When this event is fired the Info Window content is created
   // and the Info Window is opened.
   google.maps.event.addListener(marker, 'click', function() {

      // Creating the content to be inserted in the infowindow
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + name + '</div>' +
         '<div class="iw_content">' + dock_bikes + '<br />' +
         free_bases + '<br />' +
         reservations_count + '</div></div>';

      // including content to the Info Window.
      infoWindow.setContent(iwContent);

      // opening the Info Window in the current map and at the current marker station.
      infoWindow.open(map, marker);
   });
   return marker
}
