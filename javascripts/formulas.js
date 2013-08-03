// Defines formulas used by computer
  // A formula could be an object too
    // It would have 1 function per unknown variables
    // It might also have an array of all of its unknown variables, for easy checking

formulas = [];

function Formula(varNames) {
  this.varNames = varNames;
  this.functions = [];
  _this = this;
};

(function () {
  // v1 = v0 + a(t1-t0)
  var formula = new Formula(['v0', 'v1', 'a', 't0', 't1']);
  formulas.push(formula);
  formula.functions.push(function(o) {
    o.setVar(
      _this.varNames[0],
      o.v1 - (o.a * (ENV.t1 - ENV.t0))
    );
  });
  formula.functions.push(function(o) {
    o.setVar(
      _this.varNames[1],
      o.v0 + (o.a * (ENV.t1 - ENV.t0))
    );
  });
  formula.functions.push(function(o) {
    o.setVar(
      _this.varNames[2],
      (o.v1 - o.v0) / (ENV.t1 - ENV.t0)
    );
  });
  formula.functions.push(function(o) {
    ENV.setVar(
      _this.varNames[3],
      ENV.t1 - ((o.v1 - o.v0) / o.a)
    );
  });
  formula.functions.push(function(o) {
    ENV.setVar(
      _this.varNames[4],
      ENV.t0 + ((o.v1 - o.v0) / o.a)
    );
  });
})()
