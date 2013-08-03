// When the client hits submit:

  // Clear console, answer, and explanationof answers?
  // Do error checking?
  // Run computation (This will update the console)
  // Display answer
  // Backtrace through answer and display explanation

// Testing for now
(function() {
  ENV = new Thing('environment');
  ENV.setVar('t0', 0);
  ENV.setVar('t1', 5);
  obj = new Thing('obj');
  obj.setVar('v0', 0);
  obj.setVar('a', -9.8);
  computeFor('v1', obj);
  console.log('v1', obj.v1);
})()
