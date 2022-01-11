


class Robot{
	constructor(x, y, id, color){
		this.x = x;
		this.y = y;
		this.id = id;
		this.color = color;
	}
}


class Ricochet{
	constructor(rows, cols){
		this.rows = rows;
		this.cols = cols;
		this.robots = [new Robot(0,0,0, "#FF0000"), new Robot(2,2,1,"#00FF00"), new Robot(3,3,2,"#0000FF"), new Robot(4,4,3, "#00FFFF")]
    this.walls = [[2,2,3,2],[3,1,3,2],[5,0,5,1]];
	}


  // Takes a location {row#, col#} and direction in {"n", "e", "s", "w"}
  // If a robot exists in that location it will tilt it in that direction.
  tilt_robot(loc, direction){
  	//TODO
  	console.log("tilting robot at ", loc);



  	// Find out which robot is at that location if any
  	var id = null;
  	var robot;
  	for(robot of this.robots){
  		if(robot.x == loc[0] && robot.y == loc[1])
  			id = robot.id;
  	}


  	// If no robot was there just return
  	if(id == null){
  		console.log("no robot here");
  		return;
  	}



  	// Move robot
  	var dx = 0;
  	var dy = 0;

  	if(direction == "n")
  		dy = -1;
  	else if(direction == "e")
  		dx = 1;
  	else if(direction == "s")
  		dy = 1;
  	else if(direction == "w")
			dx = -1;

		var target_robot = this.robots[id]

		while(this.robot_can_step(id, dx, dy, direction)){
			// console.log(target_robot);
			target_robot.x += dx;
			target_robot.y += dy;
		}


  }


  // returns true if a robot can step in a certain direction
  robot_can_step(id, dx, dy, direction){

  	var robot = this.robots[id];


	// If new location is out of bounds return false
	if(!(robot.x + dx >= 0 && robot.x + dx <= this.cols-1 && robot.y + dy >= 0 && robot.y + dy <= this.rows-1))
		return false;



	// If it would collide with another robot return false
	var cur_robot;
	var flag = true;
	// console.log("this.robots[id].x + dx", this.robots[id].x + dx);
	// console.log("this.robots[id].y + dy", this.robots[id].y + dy);
	for(cur_robot of this.robots){
		
		// console.log(robot);
		if(cur_robot.x == robot.x + dx && cur_robot.y == robot.y + dy)
			return false
	}
	  


  // If robot would collide with a wall return false
  var target_wall = 0;
  if(direction == "n") 
  	 target_wall = [robot.x,robot.y,robot.x+1,robot.y] // target_wall is the wall that would block the robot in that diretion
  else if(direction == "e")
  	target_wall = [robot.x+1,robot.y,robot.x+1,robot.y+1]
  else if(direction == "s")
  	target_wall = [robot.x,robot.y+1,robot.x+1,robot.y+1]
  else if(direction == "w")
  	target_wall = [robot.x,robot.y,robot.x,robot.y+1]


	// Check if that wall exists
  var cur_wall;
  for(cur_wall of this.walls){
  	var is_equal = true;
  	for(let i = 0; i < 4; i ++){
  		if(cur_wall[i] != target_wall[i])
  			is_equal = false;
  	}
  	if(is_equal) return false;
  }



	return true;
  	
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


class App {
  constructor(canvas, boardHeight, boardWidth) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;


    this.canvas = canvas;
    this.canvas_width = canvas.width;
		this.canvas_height = canvas.height;

		this.ricochet_game = new Ricochet(boardHeight, boardWidth);


   
    

    this.x1 = 0; 
		this.y1 = 0;
		this.x2 = 0;
		this.y2 = 0;


    canvas.addEventListener("mousedown", this, false);
    canvas.addEventListener("mouseup", this, false)



    this.draw();

  }



 	handleEvent(event) {

 		console.log("event id: ", event.rid);

    var method = 'input_' + event.type;

  	// call method if there
 		if ( this[ method ] ) {
    	this[ method ]( event );
  	}

  }




  tilt_robot(loc, direction){
  	this.ricochet_game.tilt_robot(loc, direction);
  	const context = this.canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		console.log(this.ricochet_game.robots);
  	this.draw();
  }





  // **********************************  Drawing Functions **********************************

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


			ctx.lineWidth = 3;

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
			
			for(const robot of this.ricochet_game.robots){
				this.drawCircle(robot.x * hSpace + hSpace / 2, robot.y * vSpace + vSpace / 2, 20, robot.color)
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

			for(const wall of this.ricochet_game.walls){
				this.drawWall(wall[0], wall[1], wall[2], wall[3]);
			}
		}




// **********************************  User Input **********************************


	mousedragged(){


		var x1 = this.x1;
		var x2 = this.x2;
		var y1 = this.y1;
		var y2 = this.y2;

		var dist = Math.sqrt((x2-x1) * (x2-x1) +(y2-y1)*(y2-y1));
		if(dist < 30) return;

		
		var dAx = x2 - x1;
		var dAy = y2 - y1;
		var dBx = 1;
		var dBy = 0;


		// Find the row and column # that were initially clicked on
		var loc = this.get_grid_location_from_coord(x1,y1);


		var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
		var degree_angle = angle * (180 / Math.PI);
		
		var direction = "";


		if(degree_angle > -30 && degree_angle < 30){
			direction = 'e';
		}
		else if(degree_angle > 60 && degree_angle < 120){
			direction = 'n';
		}
		else if(degree_angle > 150 && degree_angle < 180 || degree_angle < -150 && degree_angle > -180 ){
			direction = 'w';
		}
		else if(degree_angle < -60 && degree_angle > -120){
			direction = 's';
		}


		this.tilt_robot(loc, direction);
		


}



// Receives mouse inputs
 input_mousedown(e){

  console.log("mouse clicked here: ", this.x1, ", ", this.x2);
	let rect = canvas.getBoundingClientRect();
	this.x1 = Math.floor(e.clientX - rect.left);
	this.y1 = Math.floor(e.clientY - rect.top);


}

// Receives mouse inputs
input_mouseup(e){

	console.log("this: ", this);

  console.log("mouse released")
	let rect = canvas.getBoundingClientRect();
	this.x2 = Math.floor(e.clientX - rect.left);
	this.y2 = Math.floor(e.clientY - rect.top);

	if(!(this.x1 == 0 || this.x2 == 0)){
		this.mousedragged();
	}
}






// Helper Functions *********************************

	
	// Takes as input a point on the canvas and returns
	// the row and column that point falls in
	get_grid_location_from_coord(x,y){
		console.log("x: ", x);
		console.log("y: ", y)

		// Calculate number distance between lines 
		var vLineSpace = canvas.width / rows;
		var hLineSpace = canvas.height / cols;


		var row = Math.floor(x / hLineSpace);
		var col = Math.floor(y / vLineSpace);

		return [row, col];


	}





}






















var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rows = 16;
var cols = 16;


appl = new App(canvas, 16, 16);



