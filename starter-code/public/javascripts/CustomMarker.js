function CustomMarker(options) {
    this.latlng = options.position;
    this.map_ = options.map;
	//this.args = args;	
    //this.setMap(options.map);	
    
    this.setValues( options );
    
    this.$inner = $('<div>').css({
        position: 'relative',
        left: '-50%', top: '-50%',
        width: options.width,
        height: options.height,
        cursor: 'default'
    });

    this.$div = $('<div>')
        .append( this.$inner )
        .css({
            position: 'absolute',
            display: 'none'
        });
        
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel( this.get('position') );

    this.$div.css({
        left: position.x,
        top: position.y,
        opacity: 1,
        display: 'block'
    })
      
    if (this.chart) return;

    this.chart = new google.visualization.PieChart( this.$inner[0] );
    this.chart.draw( this.get('chartData'), this.get('chartOptions') );
};

CustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}	
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng;	
};

CustomMarker.prototype.setVisible = function(visible) {

}

CustomMarker.prototype.onAdd = function() {
    $( this.getPanes().overlayMouseTarget ).append( this.$div );
};

CustomMarker.prototype.onRemove = function() {
    this.$div.remove();
};

CustomMarker.prototype.changeOptions = function(options) {
    this.setValues( options );
}