kinObjs = []

function KinObj(name) {
  this.name = name;
  this.knownVars = [];
  this.setVar = function(name, val) {
    if (!_.find(this.knownVars, function(known) { return name === known; }))
      this.knownVars.push(name);
    this[name] = val;
    console.log(this[name],"thisname")
    console.log(name,"name")
    $('input'+"."+namesController.shortToReadable(name).replace(" ","-")).val(this[name])
  };
};

