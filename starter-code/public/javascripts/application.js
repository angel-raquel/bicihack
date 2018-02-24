function initialize() {
    // First async get to verify if user is logged
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", '/isLogged', true );
    xmlHttp.send( null );

	var mapOptions = {
		zoom: 14,
        center: new google.maps.LatLng(40.415451988566375,356.29836363220215),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]
    }
    
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
	
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    directionsDisplay.setMap(map);
    
    var options = {
        //title: 'Station info',
        fontSize: 10,
        backgroundColor: 'transparent',
        //is3D: true,
        pieHole: 0.4,
        colors: ['#00cc00', '#0000ff', '#ff0000', '#808080'],
        tooltip: { 
            trigger: 'selection',
            ignoreBounds: true,
            isHtml: true,
            text: 'value'
        },

        legend: 'none'
    };

    var markers = [];

    axios.get('/station/getStations')
        .then(function (response) {
            var stations = response.data;
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
                        chartOptions: options,
                        station: stations[i],
                        xmlHttpStatus: xmlHttp.status,
                        directionsService: directionsService,
                        directionsDisplay: directionsDisplay
                    }
                )

                markers.push(customMarker);

            } // fin for

            // to cluster our CustomMarkers
            var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: '/images/m/'});

            var infoLocation = new google.maps.InfoWindow({map: map});

            // 1 If we want to avoid geolocalization for non-logged users
            // 1 var xmlHttpStatus = xmlHttp.status;
            // 1 if(xmlHttpStatus === 200) {
                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var orgPos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        // When geo-position is set add listener for right-click 
                        map.addListener('rightclick', function(event) {
                            var dstPos = {
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            }
                            calculateAndDisplayRoute(directionsService, directionsDisplay, orgPos, dstPos, xmlHttp.status);
                        });

                        infoLocation.setPosition(orgPos);
                        infoLocation.setContent(`You're here`);
                        map.setCenter(orgPos);
                    }, function() {
                            handleLocationError(true, infoLocation, map.getCenter());
                        });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoLocation, map.getCenter());
                }
            // 1 }
        })
        .catch(function (error) {
            //return null;
        });


}

function calculateAndDisplayRoute(directionsService, directionsDisplay, orgPos, dstPos, xmlHttpStatus) {
    console.log("DS")
    console.log(directionsService)
    if(xmlHttpStatus === 403) {
        $("#dialog").attr('title', 'Access denied');
        $("#dialog").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });
        var stationInfoHtml = `
            <img src="https://pedale.mx/aj./webmaster/getfile/8407713a08e455f6cf928892ac7845f4,q.gif.pagespeed.ce.0wyEai4-7S.gif" width="auto" height="200px">
        `
        $("#dialog-text").html("");
        $("#dialog-text").append(stationInfoHtml);
        $("#dialog").dialog("open");
        
    }
    else {
        directionsService.route({
            origin: `${orgPos.lat},${orgPos.lng}`,
            destination: `${dstPos.lat},${dstPos.lng}`,
            travelMode: 'BICYCLING'
        }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    var route = response.routes[0];
                } 
                else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        );
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
