kinObjs = []

function KinObj(name) {
  this.name = name;
  this.knownVars = [];
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
};

