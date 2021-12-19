
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
    this.walls = [[1,1,2,1], [3,1,3,2]];
  }


  tiltRobot(id, direction){

  }

  getRobots(){
  	return this.robots;
  }

  getWalls(){
  	return this.walls;
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
	drawWalls(canvas, ricochet.getWalls(), rows, cols);
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


function drawRobots(ctx, robots, rows, cols){

	// Calculate number distance between lines 
	var vSpace = canvas.width / rows;
	var hSpace = canvas.height / cols;

	console.log(robots)
	for(robot of robots){
		console.log(robot.x)
		drawCircle(robot.x * hSpace - hSpace / 2, robot.y * vSpace - vSpace / 2, 20, robot.color)
	}
}


function drawWall(ctx, x1, y1, x2, y2){

	// Calculate number distance between lines 
	var vSpace = canvas.width / rows;
	var hSpace = canvas.height / cols;

	ctx.beginPath();
	ctx.moveTo(x1 * hSpace, y1 * vSpace);
	ctx.lineTo(x2 * hSpace, y2 * vSpace);
	ctx.strokeStyle = "#111111";
	ctx.lineWidth = 8;
	ctx.stroke();


}

function drawWalls(ctx, walls, rows, cols){

	console.log(walls)
	for(wall of walls){
		drawWall(ctx, wall[0], wall[1], wall[2], wall[3]);
	}
}


drawGrid(canvas, 50);


// User Input

canvas.addEventListener("mousedown", mouseDownHandler, false);


// canvas.addEventListener('mousemove', moveListener);

canvas.addEventListener('mouseup', mouseUpListener);


function mouseDragged(x1,y1,x2,y2){

	var dist = Math.sqrt((x2-x1) * (x2-x1) +(y2-y1)*(y2-y1));
	if(dist < 100) return;

	
	var dAx = x2 - x1;
	var dAy = y2 - y1;
	var dBx = 1;
	var dBy = 0;


	var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
	var degree_angle = angle * (180 / Math.PI);
	console.log(degree_angle);

	if(degree_angle > -30 && degree_angle < 30){
		console.log("right")
	}
	else if(degree_angle > 60 && degree_angle < 120){
		console.log("up")
	}
	else if(degree_angle > 150 && degree_angle < 180 || degree_angle < -150 && degree_angle > -180 ){
		console.log("left")
	}
	else if(degree_angle < -60 && degree_angle > -120){
		console.log("down")
	}



}


var x1, y1, x2, y2;

// Receives mouse inputs
function mouseDownHandler(e){

  console.log("mouse clicked")
	let rect = canvas.getBoundingClientRect();
	x1 = Math.floor(e.clientX - rect.left);
	y1 = Math.floor(e.clientY - rect.top);


}

// Receives mouse inputs
function mouseUpListener(e){

  console.log("mouse released")
	let rect = canvas.getBoundingClientRect();
	x2 = Math.floor(e.clientX - rect.left);
	y2 = Math.floor(e.clientY - rect.top);


    mouseDragged(x1,y1,x2,y2);
}




draw(canvas, ricochet, rows, cols);