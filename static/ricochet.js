
class Robot{
	constructor(x, y, id, color){
		this.x = x;
		this.y = y;
		this.id = id;
		this.color = color;
	}
}


class Ricochet {
  constructor(boardHeight, boardWidth) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.robots = [new Robot(1,1,"0", "#FF0000"), new Robot(2,2,"1","#00FF00"), new Robot(3,3,"2","#0000FF"), new Robot(4,4,"3", "#00FFFF")]
    // this.walls = {((1,1),(2,1)), ((3,1),(3,2))};
  }


  tiltRobot(id, direction){

  }

  getRobots(){
  	return this.robots;
  }


  loadFromFile(){
  	return
  }



}








var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ricochet = new Ricochet(20, 20)
var rows = 16;
var cols = 16;




function draw(canvas, ricochet, rows, cols){

	drawGrid(canvas, rows, cols);
	drawRobots(canvas, ricochet.getRobots(), rows, cols);
}





// Draw the grid lines on the board.
function drawGrid(canvas, rows, cols){
	
	var ctx = canvas.getContext("2d");


	// Calculate number distance between lines 
	var vLineSpace = canvas.width / rows;
	var hLineSpace = canvas.height / cols;

	for(var i = 1; i < rows; i++){
		ctx.beginPath();
		ctx.moveTo(hLineSpace * i, 0);
		ctx.lineTo(hLineSpace * i, canvas.height);
		ctx.strokeStyle = "#111111";
		ctx.stroke();
	}

	for(var i = 1; i < cols; i++){
		ctx.beginPath();
		ctx.moveTo(0, hLineSpace * i);
		ctx.lineTo(canvas.width, hLineSpace * i);
		ctx.strokeStyle = "#111111";
		ctx.stroke();
	}
}


function drawCircle(x, y, size, color){
	console.log(color)
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.fill();
}


function drawRobots(canvas, robots, rows, cols){


	// Calculate number distance between lines 
	var vSpace = canvas.width / rows;
	var hSpace = canvas.height / cols;

	console.log(robots)
	for(robot of robots){
		console.log(robot.x)
		drawCircle(robot.x * hSpace - hSpace / 2, robot.y * vSpace - vSpace / 2, 20, robot.color)
	}
}


drawGrid(canvas, 50);


// User Input

canvas.addEventListener("mousedown", mouseDownHandler, false);

// Receives mouse inputs
function mouseDownHandler(e){

    console.log("mouse clicked")
	let rect = canvas.getBoundingClientRect();
	let x = Math.floor(e.clientX - rect.left);
	let y = Math.floor(e.clientY - rect.top);

    console.log(x / 60,y / 60)
}






draw(canvas, ricochet, rows, cols);