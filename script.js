const dim = 100;

var xpos = 0, ypos = 0;
var grid = document.getElementById('grid');
var rows, cellDim, cells, w, h, ROWS, COLS, maxDist;
var t = 0;

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

init();
/* Given a div height and a gutter dimension  *
 * inflate the right number of divs in order  *
 * to fill the whole screen                   */
function init() {
	grid.innerHTML = "";
	w = window.innerWidth;
	h = window.innerHeight;
	ROWS = Math.ceil(window.innerHeight / dim);
	COLS = Math.ceil(ROWS * (w / h));
	for(var i = 0; i < ROWS; i++) {
		grid.innerHTML += '<div class="row"></div>';
	}
	rows = document.getElementsByClassName('row');
	for(var i = 0; i < ROWS; i++) {
		for(var j = 0; j < COLS; j++) {
			var cell = '<div class="cell">'+
							'<div class="inner"></div>'+
						'</div>';
			rows[i].innerHTML += cell;
		}
	}
	cells = document.querySelectorAll(".cell");

	var origin = new Point(0, 0);
	maxDist = origin.getDist(w, h);
	rotateTo(w/2, h/2);
}

window.onresize = function() {
			window.clearTimeout(t);
			t = setTimeout(init, 400);
			console.log("t = " + t);
		}

document.onmousemove = function(e){
			xpos = e.clientX;
			ypos = e.clientY;
			rotateTo(xpos, ypos);
		}

function rotateTo(a, b) {
	for(var i = 0; i < cells.length; i++) {
		var div = cells[i]
		var x = div.offsetLeft + div.offsetWidth / 2;
		var y = div.offsetTop + div.offsetHeight / 2;
		var p = new Point(x, y);
		var dist = p.getDist(a, b) / maxDist;
		var curr = p.angleTo(a, b) + dist * 180;

		div.style.transform = 'rotate(' + -curr + 'deg)';
	}
}

