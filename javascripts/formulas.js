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
  formula.functions.push(function(o, dim) {
    var answer = o[dim].v1 - (o[dim].a * (o[dim].t1 - o[dim].t0));
    o.setVector(formulas[0].varNames[0], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = o[dim].v0 + (o[dim].a * (o[dim].t1 - o[dim].t0));
    o.setVector(formulas[0].varNames[1], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = (o[dim].v1 - o[dim].v0) / (o[dim].t1 - o[dim].t0);
    o.setVector(formulas[0].varNames[2], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = o[dim].t1 - ((o[dim].v1 - o[dim].v0) / o[dim].a);
    o.setVector(formulas[0].varNames[3], answer);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = o[dim].t0 + ((o[dim].v1 - o[dim].v0) / o[dim].a);
    o.setVector(formulas[0].varNames[4], answer);
    return answer;
  });
  // x1 = x0 + (v0 * (t1 - t0)) + (0.5 * a * (t1 - t0)^2)
  formula = new Formula(
    ['x0', 'x1', 'v0', 'a', 't0', 't1'],
    "x1 = x0 + (v0 * (t1 - t0)) + (0.5 * a * (t1 - t0)^2)"
  );
  formulas.push(formula);
  formula.functions.push(function(o, dim) {
    var answer = o[dim].x1 - (o[dim].v0 * (o[dim].t1 - o[dim].t0)) + (0.5 * o[dim].a * Math.pow((o[dim].t1 - o[dim].t0), 2));
    o.setVector(formulas[1].varNames[0], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = o[dim].x0 + (o[dim].v0 * (o[dim].t1 - o[dim].t0)) + (0.5 * o[dim].a * Math.pow((o[dim].t1 - o[dim].t0), 2));
    o.setVector(formulas[1].varNames[1], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = (o[dim].x1 - o[dim].x0 - (0.5 * o[dim].a * Math.pow((o[dim].t1 - o[dim].t0), 2))) / (o[dim].t1 - o[dim].t0);
    o.setVector(formulas[1].varNames[2], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = (o[dim].x1 - o[dim].x0 - (o[dim].v0 * (o[dim].t1 - o[dim].t0))) / (0.5 * Math.pow((o[dim].t1 - o[dim].t0), 2));
    o.setVector(formulas[1].varNames[3], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer;
    // Quadratic formula
    var possibilityOne = (-o[dim].v0 + Math.sqrt(Math.pow(o[dim].v0, 2) - (2 * o[dim].a * (o[dim].v1 - o[dim].v0)))) / o[dim].a;
    var possibilityTwo = (-o[dim].v0 - Math.sqrt(Math.pow(o[dim].v0, 2) - (2 * o[dim].a * (o[dim].v1 - o[dim].v0)))) / o[dim].a;
    if (possibilityOne >= 0) {
      answer = o[dim].t1 - possibilityOne;
    }
    else answer = o.t1 - possibilityTwo;
    o.setVector(formulas[1].varNames[4], answer);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer;
    // Quadratic formula
    var possibilityOne = (-o[dim].v0 + Math.sqrt(Math.pow(o[dim].v0, 2) - (2 * o[dim].a * (o[dim].v1 - o[dim].v0)))) / o[dim].a;
    var possibilityTwo = (-o[dim].v0 - Math.sqrt(Math.pow(o[dim].v0, 2) - (2 * o[dim].a * (o[dim].v1 - o[dim].v0)))) / o[dim].a;
    if (possibilityOne >= 0) {
      answer = o[dim].t0 + possibilityOne;
    }
    else answer = o.t0 + possibilityTwo;
    o.setVector(formulas[1].varNames[5], answer);
    return answer;
  });
  // v1^2 = v0^2 + ((2 * a) * (x1 - x0))
  formula = new Formula(
    ['v0', 'v1', 'a', 'x0', 'x1'],
    "v1^2 = v0^2 + ((2 * a) * (x1 - x0))"
  );
  formulas.push(formula);
  formula.functions.push(function(o, dim) {
    var answer = Math.sqrt(Math.pow(o[dim].v1, 2) - ((2 * o[dim].a) * (o[dim].x1 - o[dim].x0)));
    o.setVector(formulas[2].varNames[0], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = Math.sqrt(Math.pow(o[dim].v0, 2) + ((2 * o[dim].a) * (o[dim].x1 - o[dim].x0)));
    o.setVector(formulas[2].varNames[1], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = (Math.pow(o[dim].v1, 2) - Math.pow(o[dim].v0, 2)) / (2 * (o[dim].x1 - o[dim].x0));
    o.setVector(formulas[2].varNames[2], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = o[dim].x1 - ((Math.pow(o[dim].v1, 2) - Math.pow(o[dim].v0, 2)) / (2 * o[dim].a));
    o.setVector(formulas[2].varNames[3], answer, dim);
    return answer;
  });
  formula.functions.push(function(o, dim) {
    var answer = o[dim].x0 + ((Math.pow(o[dim].v1, 2) - Math.pow(o[dim].v0, 2)) / (2 * o[dim].a));
    o.setVector(formulas[2].varNames[4], answer, dim);
    return answer;
  });
})()
