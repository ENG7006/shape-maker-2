/*
	shape-maker:
	
	A nicely object-oriented project which interactively draws a shape on the screen.
	
	The parameters:
	* Start with a blank canvas
	* When the user clicks, begin drawing a shape
	* Each time the user clicks, add a vertex to the shape
	* Provide interaction feedback by drawing a line between the most recent vertex and the shape
	* 
*/

// I need a holder for a shape
var s;

// I need a canvas, and to make a shape in the holder
function setup() {
  createCanvas(600, 600);
  s = new Shape();
}

// Draw a background, set some conditions, and simply tell the shape to display itself
function draw() {
  background(0);
  stroke(255);
  fill(100);
  s.display();
}

// When the mouse is clicked, add the current mouse position as a vertex
function mouseClicked() {
	s.addVertex(mouseX, mouseY);
}

// Hit enter: close + print the shape
// Hit backspace: delete the shape
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
  OBJECT: Shape
  A Shape should:
  * display itself
  * add a vertex
  * return the most recent vertex
  * output a list of vertices
*/

//Shape constructor: takes no parameters.
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
	* Uses prototype + "object literal" notation
	* Every Shape we instantiate will have these methods
	* Notice the commas after the curly braces at the end of functions
	* Notice also the commas after method names
	* What are the other ways to make methods?
	* This is the same as { foo: "bar", sna: "fu" }, but remember:
	* In JavaScript, variables point to functions, functions are indexed by variables
*/

Shape.prototype = {

	//displays the vertex using the p5.js shape + vertex
	display: function() {
		beginShape();
		for(var i = 0; i < this.vertexIndex; i ++) {
			vertex(this.vertices[i].x, this.vertices[i].y);
		}
		endShape();
		this.trackMouse();
	},
	
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
	
	//"PRIVATE" METHODS
	
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

