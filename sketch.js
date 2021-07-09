var vehicles = [];
var flowField;
var scl = 20;
var showFlowField = false;

function setup() {
  createCanvas(640, 480);
  flowField = new FlowField(scl);
  flowField.init();
  
  createP("Click and drag to create paper airplanes.");
  
  var toggleButton = createButton("Toggle Flow Field");
  toggleButton.mousePressed(toggleFlowField);
  createP('');
  
  var newButton = createButton("New Flow Field");
  newButton.mousePressed(newFlowField);
  createP('');
  
  var clearButton = createButton("Clear Planes");
  clearButton.mousePressed(clearPlanes);

}

function draw() {
  background(188);

  if (showFlowField) {
    flowField.display();
  }

  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowField);
    vehicles[i].run();
  }
}

function toggleFlowField() {
  showFlowField = !showFlowField;
}

function newFlowField() {
   flowField.init();
}

function clearPlanes(){
  vehicles = [];
}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}