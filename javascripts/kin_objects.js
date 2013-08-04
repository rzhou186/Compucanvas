kinObjs = []

function KinObj(name) {
  this.name = name;
  this.knownVars = [];
  this.x = {};
  this.y = {};
  this.setVar = function(name, val) {
    if (!_.find(this.knownVars, function(known) { return name === known; })) {
      this.knownVars.push(name);
    }
    this[name] = val;

    if (isNaN(val)) {
      this.knownVars.splice(this.knownVars.indexOf(name), 1);
      delete this[name];
    }
    else $('input'+"."+namesController.shortToReadable(name).replace(" ","-")).val(this[name])
  };

  // This is for computed dimensional values; will only set on specified dimension
  this.setVector = function(name, val, dim) {
    this[dim][name] = val;
  };

  // This is for drawn values; will append value to both dimensions
  this.addVector = function(name, val, angle) {
    xComponent = val * Math.cos(convertToRadians(angle));
    yComponent = val * Math.sin(convertToRadians(angle));

    if (!_.find(this.knownVars, function(known) { return name === known; })) {
      this.knownVars.push(name);
      this.x[name] = xComponent;
      this.y[name] = yComponent;
    } else {
      this.x[name] += xComponent;
      this.y[name] += yComponent;
    }
  };
};

function convertToRadians(degrees) {
  return (Math.PI / 180) * degrees);
};

