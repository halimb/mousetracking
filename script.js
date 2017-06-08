const dim = 30;
const GUTTER = 40;
var ROWS = Math.floor(window.innerHeight / (dim + GUTTER));
var COLS = Math.floor(window.innerWidth / (dim + GUTTER));
var grid = document.getElementById('grid');
var rows, h, cells, prev, laps, prevYs;
var w = window.innerWidth;
var prevXpos = 0, prevYpos = 0;
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

/* Given a div height and a gutter dimension   *
 * inflate the right number of divs in order  *
 * to fill the whole screen                   */
(function init() {
	for(var i = 0; i < ROWS; i++) {
		grid.innerHTML += '<div class="row"></div>';
	}
	rows = document.getElementsByClassName('row');
	h = Math.floor(window.innerHeight / ROWS - GUTTER);
	for(var i = 0; i < ROWS; i++) {
		for(var j = 0; j < COLS; j++) {
			var cell = '<div class="cell" style="margin: '+ 
			h * 5/6 + GUTTER / 2+'px; height:'+h+'px;' + 
			'width: ' + h/6 + 'px"></div>';
			rows[i].innerHTML += cell;
		}
	}
	cells = document.querySelectorAll(".cell");
	prev = Array(cells.length).fill(0);
	laps = Array(cells.length).fill(0);
	prevYs = Array(cells.length).fill(0);
})(); 

window.onresize = function() {
			h = rows[0].offsetWidth / ROWS - GUTTER;
			for(var i = 0; i < cells.length; i++) {
				cells[i].style.height = h + "px";
			}
		}

document.onmousemove = function(e){
				xpos = e.clientX;
				ypos = e.clientY;
				if( true || Math.abs(prevXpos - xpos) > 10||
					Math.abs(prevYpos - ypos) > 10 ) {
					prevXpos = xpos;
					prevYpos = ypos;
					rotateTo(xpos, ypos);
				}
			}

function rotateTo(a, b) {
	for(var i = 0; i < cells.length; i++) {
		var div = cells[i]
		var dim = div.offsetHeight;
		var x = div.offsetLeft + dim / 2;
		var y = div.offsetTop + dim / 2;
		var p = new Point(x, y);
		var curr = p.angleTo(a, b) + laps[i] * 360;

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

		div.style.transform = 'rotate(' + -curr + 'deg)';	
	}
}

