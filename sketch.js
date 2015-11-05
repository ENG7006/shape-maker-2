var s;

// I need a canvas and a ShapeSpace
function setup() {
  createCanvas(600, 600);
  s = new Shape();
  s.addVertex(300, 300);
  s.addVertex(350, 350);
  s.addVertex(100, 400);
}

// Not sure yet what I need to do here
function draw() {
  background(0);
  stroke(255);
  fill(100);

  s.display();
}

function mouseClicked() {
	s.addVertex(mouseX, mouseY);
}

function keyPressed() {
	if (keyCode === ENTER) {
		s.done();
		s.putout();
	}
	if (keyCode === BACKSPACE) {
		s = new Shape();
	}
}


/*
  A Shape should:
  * display itself
  * add a vertex
  * return the most recent vertex
  * output a list of vertices
*/

//Shape constructor: takes either x and y or no parameters.
function Shape() {
  this.vertices = [];
  this.vertexIndex = 0;
  this.isOpen = true;
}

/*
	Make some methods:
	Public methods:
	* addVertex: takes x, y of vertex
	* lastVertex: returns an object, x: and y: of most recently added vertex
	* display: renders the shape
	* done: closes the shape
	* putout: sends lines of p5.js to the console.
	Private methods:
	* printVertex: prints an internal vertex object
	* trackMouse: if the shape is open, draws a line from the last vertex to the current mouse X & Y
	* 
*/
Shape.prototype = {
	
	//adds a vertex to the shape
	addVertex: function (x, y) {
		if (this.isOpen) {
			this.vertices[this.vertexIndex] = {x: x, y: y};
			this.vertexIndex++;
		}
	},
	  
	//returns the most recently added vertex
	lastVertex: function() {
	    return this.vertices[this.vertexIndex - 1];
	},
	
	//displays the vertex using the p5.js shape + vertex
	display: function() {
		beginShape();
		for(var i = 0; i < this.vertexIndex; i ++) {
			vertex(this.vertices[i].x, this.vertices[i].y);
		}
		endShape();
		this.trackMouse();
	},
	
	//closes the shape and disallows further editing
	done: function() {
		this.addVertex(this.vertices[0].x, this.vertices[0].y);
		this.isOpen = false;
	},
	
	//sends a p5.js series of function calls that will make the shape
	putout: function() {
		console.log("beginShape();");
		for (var i = 0; i < this.vertexIndex; i++) {
			this.printVertex(this.vertices[i]);
		}
		console.log("endShape();")
	},
	
	
	//prints a vertex, takes an internal-to-Shape object representation of a vertex:
	//{x: x, y: y}
	printVertex: function(v) {
		var out = "vertex(" + v.x + ", " + v.y + ");";
		console.log(out);
	},
	
	//draws a line between the most recent vertex and the current mouse X & Y
	trackMouse: function() {
		//only draw if there's already a vertex and the shape is open
		if (this.vertexIndex > 0 && this.isOpen) {
			//make a line between the last vertex and the current mouse position
			line(this.lastVertex().x, this.lastVertex().y, mouseX, mouseY);
		}
	}
};

