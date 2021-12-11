

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Draw the grid lines on the board.
function drawGrid(canvas, tileSize){
	
	var ctx = canvas.getContext("2d");


	// Calculate number of lines needed
	var numVLines = canvas.width / tileSize;
	var numHLines = canvas.height / tileSize;

	for(var i = 1; i < numVLines; i++){
		ctx.beginPath();
		ctx.moveTo(tileSize * i, 0);
		ctx.lineTo(tileSize * i, canvas.height);
		ctx.strokeStyle = "#770000";
		ctx.stroke();
	}

	for(var i = 1; i < numHLines; i++){
		ctx.beginPath();
		ctx.moveTo(0, tileSize * i);
		ctx.lineTo(canvas.width, tileSize * i);
		ctx.strokeStyle = "#770000";
		ctx.stroke();
	}
}

drawGrid(canvas, 50);