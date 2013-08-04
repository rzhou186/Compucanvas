(function() {
  var dimensions = ['x', 'y'];

  function computeFor(desiredVar, obj, dim) {

    // Check if the desired variable is already known
    consolesController.logConsole("Checking if desired variable is already known...");
    if (!isUnknown(desiredVar, obj)) {
      consolesController.logConsole("Variable found. Terminating computation...");
      return obj[desiredVar];
    }
    consolesController.logConsole("Variable not already known. Initiating computation...");

    consolesController.logConsole("Initiating new cycle of formula computations...");
    for (x in formulas) {
      var formula = formulas[x];
      var desiredVarIndex = -1;
      for (i in formula.varNames) {
        if (isUnknown(formula.varNames[i], obj)) {
          if (desiredVar === formula.varNames[i]) {
            desiredVarIndex = i;
          } else {
            desiredVarIndex = -1;
            break;
          }
        }
      }
      if (desiredVarIndex === -1) {
        continue;
      }
      consolesController.logBacktrace(formula.expression);
      consolesController.logConsole("Solution found.");
      return formula.functions[desiredVarIndex](obj)
      break;
    }

    consolesController.logConsole("Computation unsuccessful.");
    return "not known";

  };

  function isUnknown(varName, obj) {
    return !_.find(obj.knownVars, function(knownVar) { return knownVar === varName; })
  }

  // Export computeFor
  window.computeFor = computeFor;
})();
