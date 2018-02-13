// google.charts.load("current", {packages:["corechart"]});

google.load( 'visualization', '1', { packages:['corechart'] });

function ChartMarker( options ) {
    this.setValues( options );
    
    this.$inner = $('<div>').css({
        position: 'relative',
        left: '-50%', top: '-50%',
        width: options.width,
        height: options.height,
        //fontSize: '1px',
        //lineHeight: '1px',
        //border: '1px solid #888',
        //padding: '2px',
        //'background-color': 'black',
        cursor: 'default'
    });

    this.$div = $('<div>')
        .append( this.$inner )
        .css({
            position: 'absolute',
            display: 'none'
        });
};

ChartMarker.prototype = new google.maps.OverlayView;

ChartMarker.prototype.onAdd = function() {
    $( this.getPanes().overlayMouseTarget ).append( this.$div );
};

ChartMarker.prototype.onRemove = function() {
    this.$div.remove();
};

ChartMarker.prototype.draw = function() {
    var marker = this;
    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel( this.get('position') );

    this.$div.css({
        left: position.x,
        top: position.y,
        opacity: 1,
        display: 'block'
    })

    this.$inner
        .html( '<img src="' + this.get('image') + '"/>' )
        .click( function( event ) {
            var events = marker.get('events');
            events && events.click( event );
        });
        
    this.chart = new google.visualization.PieChart( this.$inner[0] );
    this.chart.draw( this.get('chartData'), this.get('chartOptions') );
};

function initialize() {
    var latLng = new google.maps.LatLng( 40.550868, -3.647812 );


    var map = new google.maps.Map( $('#map_canvas')[0], {
        zoom: 15,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var options = {
        //title: 'Station info',
        fontSize: 12,
        backgroundColor: 'transparent',
        pieHole: 0.4,
        colors: ['#0000ff', '#00cc00'],
        legend: 'none'
    };
    
    var data = google.visualization.arrayToDataTable([
        [ 'a', 'b' ],
        // [ 'total_bases', 24 ],
        [ 'dock_bikes', 8 ],
        [ 'free_bases', 12 ]
    ]);
    
    var marker = new ChartMarker({
        map: map,
        position: latLng,
        width: '100px',
        height: '100px',
        chartData: data,
        chartOptions: options,
    });

    var latLng2 = new google.maps.LatLng( 40.548267, -3.642491 );

    var data = google.visualization.arrayToDataTable([
        [ 'a', 'b' ],
        // [ 'total_bases', 24 ],
        [ 'dock_bikes', 4 ],
        [ 'free_bases', 20 ]
    ]);

    var marker = new ChartMarker({
        map: map,
        position: latLng2,
        width: '75px',
        height: '75px',
        chartData: data,
        chartOptions: options,
    });
};

$( initialize );