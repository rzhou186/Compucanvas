// Provides a global variable with a list of all objects
// Defines each object and its associated variables

function Thing(name) {
  this.name = name;
  this.knownVars = [];
  this.setVar = function(name, val) {
    if (!_.find(this.knownVars, function(known) { return name === known; }))
      this.knownVars.push(name);
    this[name] = val;
  };
};

