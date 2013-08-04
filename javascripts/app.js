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

    // error checking

    // extract desired var
    var desiredKinObj = getDesiredKinObj();
    var desiredVar = getDesiredVariable();

    // run computation
    consolesController.logAnswer('The solution is ' + computeFor(desiredVar, desiredKinObj) + " " + namesController.shortToUnits(desiredVar) + ".");

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
