function computeFor(desiredVar, obj) {

  // Check if the desired variable is already known
  if (!isUnknown(desiredVar, obj))
  return obj[desiredVar];

  for (x in formulas) {
    var formula = formulas[x];
    var desiredVarIndex = -1;
    for (i in formula.varNames) {
      if (isUnknown(formula.varNames[i], obj)) {
        // console.log(desiredVar, formula.varNames[i]);
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
    console.log("Backtrace of solution:");
    console.log(formula.expression);
    return formula.functions[desiredVarIndex](obj)
    break;
  }

  return "not known";

};

function isUnknown(varName, obj) {
  return !_.find(obj.knownVars, function(knownVar) { return knownVar === varName; })
}