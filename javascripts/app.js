// When the client hits submit:

  // Clear console, answer, and explanation of answers?
  // Do error checking?
  // Run computation (This will update the console)
  // Display answer
  // Backtrace through answer and display explanation

// Testing for now
(function() {
  obj = new Thing('obj');
  obj.setVar('t0', 0);
  obj.setVar('t1', 5);
  obj.setVar('v0', 0);
  // obj.setVar('v1', -49);
  obj.setVar('a', -9.8);
  obj.setVar('m', 5);

  console.log("Known variables: ");
  for (x in obj.knownVars) {
    console.log(obj.knownVars[x] + " = " + obj[obj.knownVars[x]]);
  }

  console.log('The solution is:', computeFor('v1', obj));
})()

// Add some way to map solution to correct units