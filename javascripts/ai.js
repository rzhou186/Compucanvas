(function() {
  var dimensions = ['x', 'y'];

  function computeFor(desiredVar, obj, dim) {
    while (true) {
      var validComputationFound = false;
      // Check if the desired variable is already known
      consolesController.logConsole("Checking if desired variable is already known...");
      if (!isUnknown(desiredVar, obj, dim)) {
        consolesController.logConsole("Variable found. Terminating computation...");
        return obj.get(desiredVar, dim);
      }
      consolesController.logConsole("Variable not already known. Initiating computation...");
      for (z in dimensions) {
        var dim = dimensions[z];
        consolesController.logConsole("Initiating new cycle of formula computations...");
        for (x in formulas) {
          var formula = formulas[x];
          var desiredVarIndex = -1;
          for (i in formula.varNames) {
            if (isUnknown(formula.varNames[i], obj, dim)) {
              if (desiredVarIndex === -1) {
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
          formula.functions[desiredVarIndex](obj, dim)
          validComputationFound = true;
        }
      }
      if (!validComputationFound)
        break;
    }

    consolesController.logConsole("Computation unsuccessful.");
    return "not known";

  };

  function isUnknown(varName, obj, dim) {
    if (dim !== undefined) {
      return !_.find(obj[dim].knownVars, function(knownVar) { return knownVar === varName; })
    } else {
      
      return (
          (!_.find(obj.x.knownVars, function(knownVar) { return knownVar === varName; }))
       && (!_.find(obj.y.knownVars, function(knownVar) { return knownVar === varName; }))
       )
    }
  }

  // Export computeFor
  window.computeFor = computeFor;
})();
