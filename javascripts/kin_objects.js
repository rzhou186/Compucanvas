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
    if (isNaN(val) {
      this.x.knownVars.splice(this.x.knownVars.indexOf(name), 1);
      delete this.x[name];
      this.y.knownVars.splice(this.y.knownVars.indexOf(name), 1);
      delete this.y[name];
    } else {
      if (angle === undefined) {
        xComponent = val;
        yComponent = val;
      } else {
        xComponent = val * Math.cos(convertToRadians(angle));
        yComponent = val * Math.sin(convertToRadians(angle));
      }

      if (!_.find(this.knownVars, function(known) { return name === known; })) {
        this.x.knownVars.push(name);
        this.x[name] = xComponent;
        this.y.knownVars.push(name);
        this.y[name] = yComponent;
      } else {
        this.x[name] += xComponent;
        this.y[name] += yComponent;
      }
    }
  };

  this.get(varName, dim) {
    if (dim)
      return this[dim][varName];
  }
};

function convertToRadians(degrees) {
  return (Math.PI / 180) * degrees);
};

