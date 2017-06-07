var divs = document.getElementsByClassName('div');
var w = window.innerWidth;
var h = window.innerHeight;
var xpos = 0, ypos = 0;

function Point(x, y) {
	this.x = x;
	this.y = y;

	this.getDist = function(xb, yb) {
		var distance = 
			Math.sqrt(
				Math.pow( (this.y - yb), 2 ) +
				Math.pow( (xb - this.x), 2 )
			);
		return distance;
	}

	this.angleTo = function(xb, yb) {
		var dist = this.getDist(xb, yb);
		var normX = (xb - this.x) / dist;
		var angle = -Math.acos(normX);
		angle = (this.y - yb < 0) ? 
				 -angle : angle;
		return -angle;
	}

}

document.onmousemove = function(e){
				ypos = e.clientX;
				xpos = e.clientY;
				rotateTo(xpos, ypos);
			}



function rotateTo(a, b) {
	for(var i = 0; i < divs.length; i++) {

		var div = divs[i]
		var dim = div.offsetHeight;
		var x = div.offsetTop + dim / 2;
		var y = div.offsetLeft + dim / 2;
		var p = new Point(x, y);
		var rad = p.angleTo(a, b);

		var x = p.x - dim/2;
		var y = p.y - dim/2;
		var deg = rad * 180 / Math.PI;
		div.style.transform = 'rotate(' + deg + 'deg)';
	}
}



