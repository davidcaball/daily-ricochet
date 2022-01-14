


class Robot{
	constructor(x, y, id, color){
		this.x = x;
		this.y = y;
		this.id = id;
		this.color = color;
	}
}


class Ricochet{
	constructor(rows, cols, colors){
		this.rows = rows;
		this.cols = cols;
		this.robots = [new Robot(2,3,0, colors[0]), new Robot(12,4,1,colors[1]), new Robot(3,11,2,colors[2]), new Robot(9,9,3, colors[3])]
    this.walls = [[2,2,3,2],[3,1,3,2],[5,0,5,1],[1,3,1,4],[1,4,2,4],[0,5,1,5],[0,12,1,12],[11,0,11,1],[9,1,9,2],[14,2,15,2],[15,2,15,3],[15,5,16,5],[11,4,11,5],[10,5,11,5],[6,4,6,5],[6,4,7,4],[5,6,6,6],[6,6,6,7],[7,7,8,7],[8,7,9,7],[9,7,9,8],[9,8,9,9],[7,7,7,8],[7,8,7,9],[7,9,8,9],[8,9,9,9],[12,6,13,6],[12,6,12,7],[12,9,13,9],[13,9,13,10],[15,10,16,10],[15,13,15,14],[14,14,15,14],[11,15,11,16],[9,14,9,15],[9,14,10,14],[6,14,6,15],[6,15,7,15],[5,15,5,16],[3,13,3,14],[3,13,4,13],[3,10,3,11],[2,10,3,10],[6,8,6,9],[5,9,6,9],[10,10,10,11],[10,11,11,11],[9,2,10,2]];
		
		console.log(colors)

    // x position : y position : id of robot : id of target
		this.targets = {"5:5:0:0": 0, "12:8:1:1": 1}

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


  constructor(canvas, document, rows, cols) {


  	  
    if(debugging) console.log("Starting in Debugging Mode");


    this.rows = rows;
    this.cols = cols;


    this.canvas = canvas;
    this.canvas_width = canvas.width;
		this.canvas_height = canvas.height;

		this.colorMap = {0 : "#FF0000", 1: "#00FF00", 2: "#0000FF", 3: "#FFFF00"}

		this.ricochet_game = new Ricochet(this.rows, this.cols, this.colorMap);


   	// Stores constant location of mouse
    this.mouseX = 0;
    this.mouseY = 0;
    this.space_clicked = false;

    // Stores locations of mouse clicks used to determine if a robot was clicked and dragged on
    this.x1 = 0; 
		this.y1 = 0;
		this.x2 = 0;
		this.y2 = 0;

		this.h_space = canvas.width / this.cols;
		this.v_space  = canvas.height / this.rows;



		this.robot_size = this.h_space * .35;
		this.wall_width = this.h_space / 6;


		// Add event listeners to this app object, this.handleEvent() will get called which processes the event
    canvas.addEventListener("mousedown", this, false);
    canvas.addEventListener("mouseup", this, false);
    document.addEventListener("keyup", this, false);

		var button = document.getElementById("resetbutton");
		console.log("b ",button);
		button.addEventListener("click", this, false);


    // Debugging code which allows addition of walls
    if(debugging){
    	canvas.addEventListener('mousemove', this, false); 

    	this.mouseX = 0;
	    this.mouseY = 0;
	    this.space_clicked = false;


	    this.spacex = 0;
	    this.spacey = 0;
  	}


    this.draw();

  }



 	handleEvent(event) {

 		console.log(event);
    var method = 'input_' + event.type;

  	// call method if there
 		if ( this[ method ] ) {
    	this[ method ]( event );
  	}

  }


  tilt_robot(loc, direction){
  	this.ricochet_game.tilt_robot(loc, direction);
  	const context = this.canvas.getContext('2d');
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  	this.draw();

  	this.check_is_at_target();
  }

  check_is_at_target(){

  		var target_obj = this.ricochet_game.targets;
	  	for(const robot of this.ricochet_game.robots){
	  		for (var target in target_obj) {
			    if(Object.prototype.hasOwnProperty.call(target_obj, target)) {
			        let loc = target.split(":");
			        var x = parseInt(loc[0],10);
			        var y = parseInt(loc[1],10);

			
			        if(robot.x == x && robot.y == y && target_obj[target] == robot.id){
			        	console.log("target reached!");
			        }
			    }
	  		}
	 		}
	}



	reset(){
		console.log("restting");
		this.ricochet_game = new Ricochet(this.rows, this.cols, this.colorMap);
		this.draw();
	}






  // **********************************  Drawing Functions **********************************


	 	draw(){

			this.drawGrid();
			this.drawRobots();
			this.drawWalls();
			this.draw_targets()
		}


		// Draw the grid lines on the board.
		drawGrid(){
			
			var ctx = this.canvas.getContext("2d");
			var canvas = this.canvas;
			var rows = this.rows;
			var cols = this.cols;

			ctx.fillStyle = "#D4D4CB";
			ctx.fillRect(0, 0, canvas.width, canvas.height);


			// Calculate number distance between lines 
			var vLineSpace = this.v_space;
			var hLineSpace = this.h_space;


			ctx.lineWidth = 3;

			for(var i = 0; i < rows; i++){
				ctx.beginPath();
				ctx.moveTo(hLineSpace * i, 0);
				ctx.lineTo(hLineSpace * i, canvas.height);
				ctx.strokeStyle = "#111111";
				ctx.stroke();
			}

			for(var i = 0; i < cols; i++){
				ctx.beginPath();
				ctx.moveTo(0, hLineSpace * i);
				ctx.lineTo(canvas.width, hLineSpace * i);
				ctx.strokeStyle = "#111111";
				ctx.stroke();
			}
		}



		drawCircle(x, y, size, color){

			var ctx = this.canvas.getContext("2d");
			ctx.strokeStyle = "#000000";
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(x, y, size, 0, 2 * Math.PI);
			ctx.lineWidth = 2;
			ctx.fill();
			ctx.stroke();
		}

		drawSquare(x, y, size, color){

			var ctx = this.canvas.getContext("2d");
			ctx.strokeStyle = "#000000";
			ctx.fillStyle = color;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.rect(x - size/2, y-size/2, size, size);
			ctx.fill();
			ctx.stroke();

		}

		drawTriangle(x,y,size,color) {
		    var ctx = this.canvas.getContext('2d');
		    
		    let a = size/2;
				let h = size/(2*.86602);
		    let b =.5*h;

		    ctx.lineWidth = 1;
		    ctx.fillStyle = color;
		    ctx.beginPath();
		    ctx.moveTo(x,y-h);
		    ctx.lineTo(x-a, y+b);
		    ctx.lineTo(x+a, y+b);
		    ctx.closePath();
		    // ctx.moveTo(x,y-h);
		    ctx.fill();
		    ctx.stroke();

	  		
		}

		drawRobots(){

			var canvas = this.canvas;
			var ctx = canvas.getContext("2d");

			// Calculate number distance between lines 
			var vSpace = canvas.height / this.rows;
			var hSpace = canvas.width / this.cols;
			
			for(const robot of this.ricochet_game.robots){
				this.drawCircle(robot.x * hSpace + hSpace / 2, robot.y * vSpace + vSpace / 2, this.robot_size, robot.color)
			}
		}


		drawWall(x1, y1, x2, y2){

			var canvas = this.canvas;
			var ctx = canvas.getContext("2d");

			// Calculate number distance between lines 
			var vSpace = canvas.width / this.rows;
			var hSpace = canvas.height / this.cols;

			ctx.beginPath();
			ctx.moveTo(x1 * hSpace, y1 * vSpace);
			ctx.lineTo(x2 * hSpace, y2 * vSpace);
			ctx.strokeStyle = "#111111";
			ctx.lineWidth = this.wall_width;
			ctx.stroke();

		}

		drawWalls(){

			for(const wall of this.ricochet_game.walls){
				this.drawWall(wall[0], wall[1], wall[2], wall[3]);
			}
		}

		draw_targets(){

			var target_obj = this.ricochet_game.targets;
			var counter = 0;
			for (var target in target_obj) {
		    if (Object.prototype.hasOwnProperty.call(target_obj, target)) {
		        counter += 1;
		        let t = target.split(":");
	
		        var x = parseInt(t[0],10) * this.h_space + this.h_space / 2;
		        var y = parseInt(t[1],10) * this.v_space + this.v_space / 2;

		        var color = this.colorMap[parseInt(t[2])]

		        if(counter % 2 == 0)
		        	this.drawTriangle(x,y,this.robot_size*.9, color); 
		        else
		        	this.drawSquare(x,y,this.robot_size*.7, color); 
		    }	
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

		let loc = this.get_grid_location_from_coord(this.mouseX, this.mouseY);
	  console.log("mouse clicked here: ", loc[0], ", ", loc[1]);
		let rect = this.canvas.getBoundingClientRect();
		this.x1 = Math.floor(e.clientX - rect.left);
		this.y1 = Math.floor(e.clientY - rect.top);
	}

	// Receives mouse inputs
	input_mouseup(e){

		console.log("this: ", this);

	  console.log("mouse released")
		let rect = this.canvas.getBoundingClientRect();
		this.x2 = Math.floor(e.clientX - rect.left);
		this.y2 = Math.floor(e.clientY - rect.top);

		if(!(this.x1 == 0 || this.x2 == 0)){
			this.mousedragged();
		}
	}

	//Receives key up
	input_keyup(e){

		console.log(e.keyCode);
		if(e.keyCode == 32){
			this.input_space_clicked();
		}
		if(e.keyCode == 83){
			this.save_configuration();
		}
	}


	input_mousemove(e){
		let rect = this.canvas.getBoundingClientRect();
		this.mouseX = Math.floor(e.clientX - rect.left);
		this.mouseY = Math.floor(e.clientY - rect.top);
		
	}

	input_space_clicked(){

		// Calculate number distance between lines 
		var vSpace = canvas.width / rows;
		var hSpace = canvas.height / cols;

		
		console.log(this.space_clicked)
		if(this.space_clicked){

		
			var point1x = this.spacex;
			var point1y = this.spacey;

			var point2x = Math.floor(this.mouseX / hSpace);
			var point2y = Math.floor(this.mouseY / vSpace);

			var new_wall = [point1x, point1y, point2x, point2y];

			this.ricochet_game.walls.push(new_wall);
			console.log(this.ricochet_game.walls);
			this.draw();

		}
		else{
			console.log(this);
			this.spacex = Math.floor(this.mouseX / hSpace);
			this.spacey = Math.floor(this.mouseY / vSpace);
	 
			console.log(this.spacex, ", ", this.spacey);
		}



		this.space_clicked = !this.space_clicked;

	}

	input_click(e){

		if(e["path"][0] == document.getElementById("resetbutton")){
			this.reset();
		}
	
	}








// ********************************* Utility Functions *********************************

	
	// Takes as input a point on the canvas and returns
	// the row and column that point falls in
	get_grid_location_from_coord(x,y){
		console.log("x: ", x);
		console.log("y: ", y)

		// Calculate number distance between lines 
		var vLineSpace = this.canvas.width / this.rows;
		var hLineSpace = this.canvas.height / this.cols;


		var row = Math.floor(x / this.v_space);
		var col = Math.floor(y / this.h_space);

		return [row, col];

	}


	add_wall(x,y){
		console.log("x: ", x);
		console.log("y: ", y)


		var row = Math.floor(x / this.h_space);
		var col = Math.floor(y / this.v_space);

		return [row, col];

	}

	// From https://stackoverflow.com/questions/20489454/saving-a-javascript-object-to-a-file
	save_configuration(){

		var filename = "board";

		var blob = new Blob([JSON.stringify(this.ricochet_game, null, 2)], {type: "application/json;charset=utf-8"}).slice(2,-1);
    var url = URL.createObjectURL(blob);
    var elem = document.createElement("a");
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
	}







}
















debugging = false;


window.onload = function() {


  var canvas = document.getElementById("myCanvas");


	var ctx = canvas.getContext("2d");
	var rows = 16;
	var cols = 16;


	appl = new App(canvas, document, 16, 16);

};
