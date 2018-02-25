function initialize() {
 
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
        fontSize: 10,
        backgroundColor: 'transparent',
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

            }

            var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: '/images/m/'});

            var infoLocation = new google.maps.InfoWindow({map: map});

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
                    handleLocationError(false, infoLocation, map.getCenter());
                }
        })
        .catch(function (error) {
        });


}

function calculateAndDisplayRoute(directionsService, directionsDisplay, orgPos, dstPos, xmlHttpStatus) {
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
                    $("#dialog").attr('title', 'Route simulator');
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
                    <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="row">
                          <div class="col-sm-12" style="text-align:right">
                            <div class="fb-like" data-href="" data-layout="button_count" data-action="like" data-show-faces="true"
                              data-share="true">
                            </div>
                          </div>
                        </div>
                        <div class="panel panel-primary">
                          <div class="panel-body">
                            <form id="mainform" class="form-horizontal" onsubmit="initMovie();return false">
                              <div class="form-group hidden">
                                <div class="col-sm-10 hidden">
                                  <input name="origin" class="form-control hidden" onchange="buildLink()" placeholder="origin" type="hidden" id="origin" value="${orgPos.lat},${orgPos.lng}"/>
                                </div>
                              </div>
                              <div class="form-group hidden">
                                <div class="col-sm-10">
                                  <input name="destination" class="form-control hidden" onchange="buildLink()" placeholder="destination" type="hidden" id="destination" value="${dstPos.lat},${dstPos.lng}"/>
                                </div>
                              </div>
                                <div class="form-group">
                                  <div class="col-sm-10">
                                    <label for="fps">Speed</label>
                                    <input name="fps" class="form-control hidden" onchange="buildLink()" placeholder="frames per second" type="text" id="fps" value="1"/>
                                  </div>
                                </div>
                                <div class="form-group hidden">
                                  <div class="col-sm-10">
                                    <select name="travelmode" class="form-control hidden" onchange="buildLink()" id="travelmode" type="hidden">
                                      <option value="DRIVING">Driving</option>
                                      <option value="BICYCLING" selected>Bicycling</option>
                                      <option value="TRANSIT">Transit</option>
                                      <option value="WALKING">Walking</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="form-group hidden">
                                  <div class="col-sm-10 hidden">
                                    <input type="hidden" id="gxp-file" class="btn btn-secondary hidden" />
                                  </div>
                                </div>
                                <div class="form-group hidden">
                                  <div class="col-sm-10">
                                    <input type="hidden" id="routename" name="rn" onchange="buildLink()" class="form-control hidden" />
                                  </div>
                                </div>
                              <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                  <input type="submit" class="btn btn-primary" value="Play" />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-9" style="margin-top:20px">
                        <div id="statusbox" class="alert alert-danger" style="display:none"></div>
                        <div class="panel panel-info" id="stage" style="display:none">
                          <div class="panel-heading">
                            <span style="float:right" id="route-distance"></span>
                            <span id="route-name-label"></span>
                          </div>
                          <div class="panel-body">
                            <div class="row">
                              <div class="col-md-12">
                                <canvas id="draw" height="700"></canvas>
                                <div id="progress" class="progress">
                                  <div class="progress-bar progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="progressbar" style="width:0%"></div>
                                  <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="bufferbar" style="width:0%"></div>
                                </div>
                                <div class="btn-group" id="controls" style="visibility:hidden;height:20px;margin-bottom:20px">
                                  <button title="Pause" type="button" class="btn btn-sm btn-primary" id="btn_playpause" onclick="pauseMovie(this)">
                                    <span class="glyphicon glyphicon-pause" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" class="btn btn-sm" aria-label="Slower" onclick="slowDownMovie()" title="Slower">
                                    <span class="glyphicon glyphicon-backward" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" class="btn btn-sm" aria-label="Faster" title="Faster" onclick="speedUpMovie()">
                                    <span class="glyphicon glyphicon-forward" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" class="btn btn-sm" aria-label="Download" title="Download" data-toggle="modal" data-target="#downloadModal">
                                    <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" class="btn btn-sm" aria-label="Share" title="Share" onclick="shareMovie()" data-toggle="modal" data-target="#shareModal">
                                    <span class="glyphicon glyphicon-share" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" class="btn btn-sm" aria-label="Fullscreen" title="Fullscreen" onclick="fullScreen()">
                                    <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div id="elevation_chart"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- STREETVIEW_PLAYER -->
                  </div>
                  <script>
                    (function (i, s, o, g, r, a, m) {
                      i['GoogleAnalyticsObject'] = r;
                      i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                      }, i[r].l = 1 * new Date();
                      a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                      a.async = 1;
                      a.src = g;
                      m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                  </script>
                

                  <script src="/javascripts/async.min.js" type="text/javascript"></script>
                 
                  <script type="text/javascript" src="/javascripts/j.js"></script>
                  <script type="text/javascript" src="/javascripts/gif.js"></script>
                  <script src="/javascripts/bootstrap.min.js"></script>                 
                  `
                    $("#dialog-text").html("");
                    $("#dialog-text").append(stationInfoHtml);
                    $("#dialog").dialog("open");
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        );
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
