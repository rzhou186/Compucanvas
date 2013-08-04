kinObjs = []

function KinObj(name) {
  this.name = name;
  this.x = {knownVars: []};
  this.y = {knownVars: []};

/*
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
*/

  // This is for computed dimensional values; will only set on specified dimension
  this.setVector = function(name, val, dim) {
    if (dim) {
      this[dim].knownVars.push(name);
      this[dim][name] = val;
    } else {
      this.x.knownVars.push(name);
      this.x[name] = val;
      this.y.knownVars.push(name);
      this.y[name] = val;
    }
  };

  // This is for drawn values; will append value to both dimensions
  this.addVector = function(name, val, angle) {
  	console.log(name,val,angle,"-------------------------------")
    if (isNaN(val)) {
      if (name !== 'y') {
        this.x.knownVars.splice(this.x.knownVars.indexOf(name), 1);
        delete this.x[name];
      }
      if (name !== 'x') {
        this.y.knownVars.splice(this.y.knownVars.indexOf(name), 1);
        delete this.y[name];
      }
    } else {
      // TODO this line needs to be double checked for accuracy

      
      if (angle === undefined) {
        xComponent = val;
        yComponent = val;
        $('input' + '.' + namesController.shortToReadable(name).replace(' ', '-')).val(val);
      } else {
        xComponent = val * Math.cos(convertToRadians(angle));
        yComponent = val * Math.sin(convertToRadians(angle));
        $('input' + '.' + namesController.shortToReadable(name).replace(' ', '-') + ".magnitude").val(val);
        $('input' + '.' + namesController.shortToReadable(name).replace(' ', '-') + ".angle").val(angle);
       	console.log(xComponent,yComponent)
      }

      if (!_.find(this.x.knownVars, function(known) { return name === known; })) {
        if (name !== 'y') {
          this.x.knownVars.push(name);
          this.x[name] = xComponent;
        }
        if (name !== 'x') {
          this.y.knownVars.push(name);
          this.y[name] = yComponent;
        }
      } else {
        if (name !== 'y') 
          this.x[name] += xComponent;
        if (name !== 'x')
          this.y[name] += yComponent;
      }
    }
  };

  // TODO make this properly return vector angle when no dimension
  this.get = function(varName, dim) {
    var val;
    if (dim) {
      val = this[dim][varName];
    } else {
      val = Math.sqrt(Math.pow(this.x[varName], 2) + Math.pow(this.y[varName], 2));
    }
    return val.toFixed(1);
  };
};

function convertToRadians(degrees) {
  return (Math.PI / 180) * degrees;
};

