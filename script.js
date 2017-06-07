var canvas = document.getElementById('cnv');
var w = window.innerWidth;
canvas.width = w / 2;
canvas.height = w / 2;
var ctx = canvas.getContext('2d');
console.log([ctx]);

// ctx.fillStyle = 'rgba(0,0,0,1)';
// ctx.fillRect(0,0,200,200);
initCanvas();

function initCanvas() {
	ctx.fillRect(canvas.width / 2 - 2, canvas.height / 2 - 2, 4, 4);
}

canvas.onclick = function(e) {
			var x = e.clientX - canvas.offsetLeft;
			var y = e.clientY - canvas.offsetTop;
			ctx.fillRect(x - 10, y - 10, 20, 20)
		}
