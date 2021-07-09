function FlowField(scl) {
  this.scl = scl; //resolution to grid scale

  //determine the number of colums and rows based on size of canvas
  this.cols = width / this.scl;
  this.rows = height / this.scl;
  this.field = new Array(this.cols * this.rows);


  this.init = function() {
    //reseed the noise so we get a new flow field every time the application starts
    this.field = [];
    var xoff = random(1000);
    for (var i = 0; i < this.rows; i++) {
      var yoff = 0;
      for (var j = 0; j < this.cols; j++) {
        var theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        var index = j + (i * this.cols);
        this.field[index] = p5.Vector.fromAngle(theta);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  this.display = function() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var index = j + (i * this.cols);
        var x = j * this.scl;
        var y = i * this.scl;
        this.drawVector(this.field[index], x, y);
      }
    }
  }

  this.drawVector = function(v, x, y) {
    stroke(0);
    strokeWeight(1);
    push();
    translate(x, y);
    rotate(v.heading());
    var len = v.mag() * this.scl;
    line(0, 0, len - 2, 0);
    pop();
  }

  this.lookup = function(location) {
    var column = floor(constrain((location.x / this.scl), 0, this.cols - 1));
    var row = floor(constrain((location.y / this.scl), 0, this.rows - 1));
    var index = column + (row * this.cols);
    var desired = this.field[index].copy();
    return desired;
  }
}