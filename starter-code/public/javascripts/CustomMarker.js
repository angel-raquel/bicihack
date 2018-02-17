function CustomMarker(options) {
    this.latlng = options.position;
    this.map_ = options.map;
    this.zoomOld = this.map_.zoom;
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
    var zoomFactor = this.map_.zoom
    var size = this.map_.zoom * 5;
    var sizepx = size+"px";

    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel( this.get('position') );

    this.$div.css({
        left: position.x,
        top: position.y,
        opacity: 1,
        display: 'block'
    })

    this.$inner.css({
        // background: 'yellow',
        width: this.resizeChart(),
        height: this.resizeChart()
    });

    if (this.chart && this.zoomNotChanged()) {
        return;
    }

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

CustomMarker.prototype.resizeChart = function() {
    // base = 40px
    var base = 40;
    // increments by 20px
    var increment = 20;
    var zoomArray = [14,15,16,17,18,19,20,21,22];

    var index = zoomArray.indexOf(this.map_.zoom);
    var resizeValue = base + (index * increment);
    // console.log("ZOOM: " + this.map_.zoom);
    // console.log("INDEX: " + index);
    return `${resizeValue}px`

};

CustomMarker.prototype.zoomNotChanged= function() {
    if (this.zoomOld === this.map_.zoom) {
        return true
    }
    else {
        this.zoomOld = this.map_.zoom;
        return false;
    }
};