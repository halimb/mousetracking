const dim = 80;

var xpos = 0, ypos = 0;
var grid = document.getElementById('grid');
var rows, cellDim, cells, prev, laps, 
	prevYs, maxDist, w, h, ROWS, COLS;
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
	prev = Array(cells.length).fill(0);
	laps = Array(cells.length).fill(0);
	prevYs = Array(cells.length).fill(0);
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
		var curr = p.angleTo(a, b) + dist * 270 + laps[i] * 360;


		/*Uncomment this block if transitions	*
		  are enabled in css. this forces the 	*
		  divs to always choose the shortest 	*
		  rotation path							*/
		// var dir = prevYs[i] - y;
		// if(Math.abs(prev[i] - curr) > 180) {
		// 	curr = dir > 0 ? 
		// 		curr + 360 : -360 + curr;
		// 	laps[i] += dir > 0 ? 1 : -1;
		// }
		// prevYs[i] = b;
		// prev[i] = curr;

		// var c = 255 - Math.floor(150 * dist) ;
		// var color = 'rgba(' + c + ',' + c + ',' + c + ', 1)';
		// div.childNodes[0].style.borderColor = color;
		div.style.transform = 'rotate(' + -curr + 'deg)';
	}
}

