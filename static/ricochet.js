
class Robot{
	constructor(x, y, id, color){
		this.x = x;
		this.y = y;
		this.id = id;
		this.color = color;
	}
}


class App {
  constructor(canvas, boardHeight, boardWidth) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.robots = [new Robot(1,1,"0", "#FF0000"), new Robot(2,2,"1","#00FF00"), new Robot(3,3,"2","#0000FF"), new Robot(4,4,"3", "#00FFFF")]
    this.walls = [[1,1,2,1], [3,1,3,2]];
    this.canvas = canvas;
    this.InputHandler = new InputHandler(canvas);
    window.addEventListener("moverobot", this, false);

    this.draw();

  }


 	handleEvent(event) {

 		console.log(event);

    var method = 'on_' + event.type;

  	// call method if there
 		if ( this[ method ] ) {
    	this[ method ]( event );
  	}

  }


  tiltRobot(id, direction){

  	var robot = robot[i];

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







 	draw(){

		this.drawGrid();
		this.drawRobots();
		this.drawWalls();
	}





// Draw the grid lines on the board.
drawGrid(){
	
	var ctx = this.canvas.getContext("2d");
	canvas = this.canvas;
	rows = this.boardHeight;
	cols = this.boardWidth;

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



drawCircle(x, y, size, color){

	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.fill();
}


drawRobots(){

	var canvas = this.canvas;
	var ctx = canvas.getContext("2d");

	// Calculate number distance between lines 
	var vSpace = canvas.width / rows;
	var hSpace = canvas.height / cols;
	
	for(const robot of this.robots){
		this.drawCircle(robot.x * hSpace - hSpace / 2, robot.y * vSpace - vSpace / 2, 20, robot.color)
	}
}


drawWall(x1, y1, x2, y2){

	var canvas = this.canvas;
	var ctx = canvas.getContext("2d");

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

drawWalls(){

	for(const wall of this.walls){
		this.drawWall(wall[0], wall[1], wall[2], wall[3]);
	}


}



}









class InputHandler{


	constructor(canvas, parent_app) {

		this.parent_app = parent_app;
    this.canvas = canvas;	
		canvas.addEventListener("mousedown", this, false);
		canvas.addEventListener('mouseup', this);
		this.x1 = 0; 
		this.y1 = 0;
		this.x2 = 0;
		this.y2 = 0;

  }

  // https://metafizzy.co/blog/this-in-event-listeners/
 	handleEvent(event) {

    var method = 'on_' + event.type;

  	// call method if there
 		if ( this[ method ] ) {
    	this[ method ]( event );
  	}

  }



// User Input


	mousedragged(){


		var x1 = this.x1;
		var x2 = this.x2;
		var y1 = this.y1;
		var y2 = this.y2;

		var dist = Math.sqrt((x2-x1) * (x2-x1) +(y2-y1)*(y2-y1));
		if(dist < 100) return;

		
		var dAx = x2 - x1;
		var dAy = y2 - y1;
		var dBx = 1;
		var dBy = 0;



		const event = new CustomEvent('moverobot', { id: 1, direction: 'e' });


		var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
		var degree_angle = angle * (180 / Math.PI);
	

		if(degree_angle > -30 && degree_angle < 30){
			event.direction = 'e';
		}
		else if(degree_angle > 60 && degree_angle < 120){
			event.direction = 'n';
		}
		else if(degree_angle > 150 && degree_angle < 180 || degree_angle < -150 && degree_angle > -180 ){
			event.direction = 'w';
		}
		else if(degree_angle < -60 && degree_angle > -120){
			event.direction = 's';
		}

		window.dispatchEvent(event);



}



// Receives mouse inputs
 on_mousedown(e){

  console.log("mouse clicked")
	let rect = canvas.getBoundingClientRect();
	this.x1 = Math.floor(e.clientX - rect.left);
	this.y1 = Math.floor(e.clientY - rect.top);


}

// Receives mouse inputs
on_mouseup(e){

	console.log("this: ", this);

  console.log("mouse released")
	let rect = canvas.getBoundingClientRect();
	this.x2 = Math.floor(e.clientX - rect.left);
	this.y2 = Math.floor(e.clientY - rect.top);

	if(!(this.x1 == 0 || this.x2 == 0)){
		this.mousedragged();
	}
	
}





}




















var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rows = 16;
var cols = 16;


app = new App(canvas, 16, 16);



