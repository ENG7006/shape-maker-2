/* 
  A ShapeSpace should:
  * make new shapes
  * know the shape we are working on
  * make multiple shapes & know about them
  * tell a shape to output itself
  * 
*/
function ShapeSpace() {
  this.openShape = false;
  this.shapes = [];

  // Add a shape to the list of shapes; but don't do it if I'm already working on one.
  this.addShape = function(x, y){
    if (this.openShape == false) {
      this.shapes.push(new Shape(x, y));
    }
  }
  
  //Draw all m
  this.display = function() {
    var numShapes = this.shapes.length;
    for (var i = 0; i < numShapes; i++) {
      this.shapes[i].display();
    }
    this.trackMouse();
  }
  
  //Draw a line between the last vertex and my mouse
  this.trackMouse = function() {
    line(mouseX, mouseY, this.currentShape().lastVertex().x, this.currentShape().lastVertex().y);
  }
  
  this.currentShape = function() {
    return this.shapes[this.shapes.length - 1];
  }
}