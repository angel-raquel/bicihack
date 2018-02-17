function initialize() {
	
	var mapOptions = {
		zoom: 14,
        center: new google.maps.LatLng(40.415451988566375,356.29836363220215),
        mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var options = {
        //title: 'Station info',
        fontSize: 10,
        backgroundColor: 'transparent',
        pieHole: 0.4,
        colors: ['#00cc00', '#0000ff', '#ff0000', '#808080'],
        legend: 'none'
    };

    var markers = [];

    for (var i = 0; i < stations.length; i++){
        var position = new google.maps.LatLng(stations[i].latitude, stations[i].longitude);
        if(stations[i].activate === 0 || stations[i].no_available === 1) {
            var freeBikes = 0;
            var docks = 0;
            var reservedBikes = 0;
            var offline = 1; 
        }
        else {
            var freeBikes = stations[i].dock_bikes;
            var docks = stations[i].free_bases;
            var reservedBikes = stations[i].reservations_count;
            var offline = 0;
        }
        var data = google.visualization.arrayToDataTable([
            ['parameter', 'value'],
            ['bikes', freeBikes],
            ['docks', docks],
            ['reservations', reservedBikes],
            ['offline', offline]
        ]);
        var size = map.zoom * 5;
        var sizepx = size+"px";

        var customMarker = new CustomMarker(
            {             
                map: map,
                position: position,  
                width: sizepx,
                height: sizepx,
                chartData: data,
                chartOptions: options
            }
        )

        markers.push(customMarker);
       
        // var name = stations[i].name;
        // var dock_bikes = stations[i].dock_bikes;
        // var free_bases = stations[i].free_bases;
        // var reservations_count = stations[i].reservations_count;
    }

    // to cluster our CustomMarkers
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

        var infoLocation = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
    
            infoLocation.setPosition(pos);
            infoLocation.setContent(`You're here`);
            //map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoLocation, map.getCenter());
            });
            // User position
            // var marker = new google.maps.Marker({
            //     position: pos,
            //     map: map
            //   });
            //   marker.setMap(map);
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoLocation, map.getCenter());
        }

}

google.maps.event.addDomListener(window, 'load', initialize);
