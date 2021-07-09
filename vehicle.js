function Vehicle(x, y) {
  this.loc = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.mass = 1;
  this.r = 6;
  this.maxSpeed = 4; //the faster it will move
  this.maxForce = 0.1; //bigger the number, the faster it will turn.

  this.update = function() {
    //update velocity
    this.vel.add(this.acc);

    //limit velocity
    this.vel.limit(this.maxSpeed);

    //update location
    this.loc.add(this.vel);

    //reset acceleration
    this.acc.mult(0);
  }

  this.applyForce = function(force) {
    var newAcc = force.div(this.mass);
    this.acc.add(newAcc);
  }

  this.seek = function(target) {
    //desired is the vector towards the target. Straight line to the target
    var desired = p5.Vector.sub(target, this.loc);

    var distance = desired.mag();

    //if close to the target, slow down. otherwise go at max speed
    if (distance < 100) {
      var newSpeed = map(distance, 0, 100, 0, this.maxSpeed);
      desired.setMag(newSpeed);
    } else {
      desired.setMag(this.maxSpeed);
    }

    //steering is "desired" vector - current velocity
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);

    //apply the steering vector as a force to rotate the vehicle
    this.applyForce(steering);
  }

  //vehicle follows the vector of the flow field at its current location
  this.follow = function(flowField) {
    //what is the vector at the current location?
    var desired = flowField.lookup(this.loc);
    
    //scale desired vector to maxSpeed
    desired.setMag(this.maxSpeed);
    
    //steering = desired - velocity
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering);
    
  }

  this.borders = function() {
    if (this.loc.x < this.r * -1) {
      this.loc.x = width + this.r;
    }

    if (this.loc.y < this.r * -1) {
      this.loc.y = height + this.r;
    }

    if (this.loc.x > width + this.r) {
      this.loc.x = -1 * this.r;
    }

    if (this.loc.y > height + this.r) {
      this.loc.y = -1 * this.r;
    }
  }

  this.display = function() {
    // draw a triangle rotated in the direction of velocity
    var theta = this.vel.heading() + (PI / 2);
    fill(255);
    noStroke();
    push();
    translate(this.loc.x, this.loc.y);
    rotate(theta);
    beginShape();
    vertex(0, this.r * -2);
    vertex(-1 * this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
  
  this.run = function(){
    this.update();
    this.borders();
    this.display();
  }
}