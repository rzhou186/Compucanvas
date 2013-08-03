// Provides a global variable with a list of all objects
// Defines each object and its associated variables

function Object() {
  this.mass = 1;
  this.states = { start: new State(this), end: new State(this) }
}

// This will likely be a singleton
function Environment() {
  this.time = 0;
}

function State(obj) {
  this.obj = obj
  this.time = 0;
  this.yPos = 0;
  this.yVelocity = 0;
  this.yAcceleration = 0;
}
