formulas = [];

function Formula(varNames, expression) {
  this.varNames = varNames;
  this.expression = expression;
  this.functions = [];
};

(function () {

  var formula;

  // v1 = v0 + (a * (t1 - t0))
  formula = new Formula(
    ['v0', 'v1', 'a', 't0', 't1'],
    "v1 = v0 + (a * (t1 - t0))"
  );
  formulas.push(formula);
  formula.functions.push(function(o) {
    var answer = o.v1 - (o.a * (o.t1 - o.t0));
    o.setVar(formulas[0].varNames[0], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = o.v0 + (o.a * (o.t1 - o.t0));
    o.setVar(formulas[0].varNames[1], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = (o.v1 - o.v0) / (o.t1 - o.t0);
    o.setVar(formulas[0].varNames[2], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = o.t1 - ((o.v1 - o.v0) / o.a);
    o.setVar(formulas[0].varNames[3], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = o.t0 + ((o.v1 - o.v0) / o.a);
    o.setVar(formulas[0].varNames[4], answer);
    return answer;
  });

  // x1 = x0 + (v0 * (t1 - t0)) + (0.5 * a * (t1 - t0)^2)
  formula = new Formula(
    ['x0', 'x1', 'v0', 'a', 't0', 't1'],
    "x1 = x0 + (v0 * (t1 - t0)) + (0.5 * a * (t1 - t0)^2)"
  );
  formulas.push(formula);
  formula.functions.push(function(o) {
    var answer = o.x1 - (o.v0 * (o.t1 - o.t0)) + (0.5 * o.a * Math.pow((o.t1 - o.t0), 2));
    o.setVar(formulas[1].varNames[0], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = o.x0 + (o.v0 * (o.t1 - o.t0)) + (0.5 * o.a * Math.pow((o.t1 - o.t0), 2));
    o.setVar(formulas[1].varNames[1], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = (o.x1 - o.x0 - (0.5 * o.a * Math.pow((o.t1 - o.t0), 2))) / (o.t1 - o.t0);
    o.setVar(formulas[1].varNames[2], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = (o.x1 - o.x0 - (o.v0 * (o.t1 - o.t0))) / (0.5 * Math.pow((o.t1 - o.t0), 2));
    o.setVar(formulas[1].varNames[3], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer;
    // Quadratic formula
    var possibilityOne = (-o.v0 + Math.sqrt(Math.pow(o.v0, 2) - (2 * o.a * (o.v1 - o.v0)))) / o.a;
    var possibilityTwo = (-o.v0 - Math.sqrt(Math.pow(o.v0, 2) - (2 * o.a * (o.v1 - o.v0)))) / o.a;
    if (possibilityOne >= 0) {
      answer = o.t1 - possibilityOne;
    }
    else answer = o.t1 - possibilityTwo;
    o.setVar(formulas[1].varNames[4], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer;
    // Quadratic formula
    var possibilityOne = (-o.v0 + Math.sqrt(Math.pow(o.v0, 2) - (2 * o.a * (o.v1 - o.v0)))) / o.a;
    var possibilityTwo = (-o.v0 - Math.sqrt(Math.pow(o.v0, 2) - (2 * o.a * (o.v1 - o.v0)))) / o.a;
    if (possibilityOne >= 0) {
      answer = o.t0 + possibilityOne;
    }
    else answer = o.t0 + possibilityTwo;
    o.setVar(formulas[1].varNames[5], answer);
    return answer;
  });

  // v1^2 = v0^2 + ((2 * a) * (x1 - x0))
  formula = new Formula(
    ['v0', 'v1', 'a', 'x0', 'x1'],
    "v1^2 = v0^2 + ((2 * a) * (x1 - x0))"
  );
  formulas.push(formula);
  formula.functions.push(function(o) {
    var answer = Math.sqrt(Math.pow(o.v1, 2) - ((2 * o.a) * (o.x1 - o.x0)));
    o.setVar(formulas[2].varNames[0], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = Math.sqrt(Math.pow(o.v0, 2) + ((2 * o.a) * (o.x1 - o.x0)));
    o.setVar(formulas[2].varNames[1], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = (Math.pow(o.v1, 2) - Math.pow(o.v0, 2)) / (2 * (o.x1 - o.x0));
    o.setVar(formulas[2].varNames[2], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = o.x1 - ((Math.pow(o.v1, 2) - Math.pow(o.v0, 2)) / (2 * o.a));
    o.setVar(formulas[2].varNames[3], answer);
    return answer;
  });
  formula.functions.push(function(o) {
    var answer = o.x0 + ((Math.pow(o.v1, 2) - Math.pow(o.v0, 2)) / (2 * o.a));
    o.setVar(formulas[2].varNames[4], answer);
    return answer;
  });

})()
