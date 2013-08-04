(function() {
  var dimensions = ['x', 'y'];

  function computeFor(desiredVar, obj, dim) {
    while (true) {
      var validComputationFound = false;
      consolesController.logConsole("Checking if desired variable is known...");
      if (!isUnknown(desiredVar, obj, dim)) {
        consolesController.logConsole("Variable found. Terminating computation...");
        consolesController.logConsole("Computation complete.");
        return obj.get(desiredVar, dim);
      }
      consolesController.logConsole("Variable not known. Preparing for new computation...");
      for (z in dimensions) {
        var dim = dimensions[z];
        consolesController.logConsole("Initiating new cycle of formula computations...");
        for (x in formulas) {
          var formula = formulas[x];
          consolesController.logConsole("Parsing following formula: " + formula.expression);
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
          formula.functions[desiredVarIndex](obj, dim)
          consolesController.logBacktrace(formula.expression);
          consolesController.logConsole("Formula successful. Adding variable to known vars...");
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
