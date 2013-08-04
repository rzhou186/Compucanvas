// When the client hits submit:

  // Clear console, answer, and explanation of answers?
  // Do error checking?
  // Run computation (This will update the console)
  // Display answer
  // Backtrace through answer and display explanation


$(document).ready(function(){
  var canvas = new fabric.Canvas('canvas');
  canvasModel.canvas = canvas;
  canvasController.resizeCanvas();
  window.onresize = canvasController.resizeCanvas;
  $('.circle_label').click(function(){
    canvasController.genCircle()
  });
  $('.line_label').click(function(){
    canvasController.placeLine()
  });
  $('#compute').click(function(){
    
    consolesController.clear();

    // update all variables
    varsController.updateAllKinObjs();
    console.log(kinObjs,"KIND OBJS HERE")

    // error checking

    // extract desired var
    var desiredKinObj = getDesiredKinObj();
    var desiredVar = getDesiredVariable();

    // run computation
    console.log('The solution is:', computeFor(desiredVar, desiredKinObj));

  });
});

consolesController.clear = function(){
  $('.rightbar').children().html("")
}

function getDesiredKinObj() {
  return kinObjs[$(".kinObjects :selected").val()];
}

function getDesiredVariable() {
  return $(".variables :selected").val();
}

// Testing for now
// (function() {
//   kinObj = new KinObj('kinObj');
//   kinObj.setVar('t0', 0);
//   kinObj.setVar('t1', 5);
//   kinObj.setVar('v0', 0);
//   kinObj.setVar('v1', -49);
//   kinObj.setVar('a', -9.8);
//   kinObj.setVar('m', 5);

//   console.log("Known variables: ");
//   for (x in kinObj.knownVars) {
//     console.log(kinObj.knownVars[x] + " = " + kinObj[kinObj.knownVars[x]]);
//   }

//   console.log('The solution is:', computeFor('v1', kinObj));
// })

// Add some way to map solution to correct units