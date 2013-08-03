// Defines functions for running the computation using the formulas
  // Updates the console along the way
  // This will need to grab all of the values from the input box

function computeFor(desiredVar, obj) {
  for (x in formulas) {
    var formula = formulas[x];
    var desiredVarIndex = -1;
    for (i in formula.varNames) {
      if (isUnknown(formula.varNames[i], obj)) {
        console.log(desiredVar, formula.varNames[i]);
        if (desiredVar === formula.varNames[i]) {
          desiredVarIndex = i;
        } else {
          desiredVarIndex = -1;
          break;
        }
      }
    }
    if (desiredVarIndex === -1)
      continue;
    formula.functions[desiredVarIndex](obj)
    break;
  }
};

function isUnknown(varName, obj) {
  return (!_.find(obj.knownVars, function(knownVar) { return knownVar === varName; })
    && !_.find(ENV.knownVars, function(knownVar) { return knownVar === varName; }))
}
