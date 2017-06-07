var divs = document.getElementsByClassName('div');
var prev = Array(divs.length).fill(0);
var laps = Array(divs.length).fill(0);
var w = window.innerWidth;
var h = window.innerHeight;
var xpos = 0, ypos = 0;

function Point(x, y) {
	this.x = x;
	this.y = y;

	this.getDist = function(xb, yb) {
		var distance = 
			Math.sqrt(
				Math.pow( (yb - this.y), 2 ) +
				Math.pow( (xb - this.x), 2 )
			);
		return distance;
	}

	this.angleTo = function(xb, yb) {
		var dist = this.getDist(xb, yb);
		var normX = (xb - this.x) / dist;
		var normY = (this.y - yb) / dist;
		var acos = parseInt( Math.acos(normX) * 180 / Math.PI);
		var asin = parseInt( Math.asin(normY) * 180 / Math.PI);
		var angle = (normY > 0) ? acos : 
						((normX < 0) ? 180 - asin : 
										360 + asin);
		return angle;
	}

}

document.onmousemove = function(e){
				xpos = e.clientX;
				ypos = e.clientY;
				rotateTo(xpos, ypos);
			}

var display = document.getElementById("display");

function rotateTo(a, b) {
	for(var i = 0; i < divs.length; i++) {
		var div = divs[i]
		var dim = div.offsetHeight;
		var x = div.offsetLeft + dim / 2;
		var y = div.offsetTop + dim / 2;
		var p = new Point(x, y);
		var curr = p.angleTo(a, b);

		if(div.id =="test") 
		{
			var x = p.x - dim/2;
			var y = p.y - dim/2;
			div.style.transform = 'rotate(' + -curr + 'deg)';
			//console.log(curr)
		}
	}
}


