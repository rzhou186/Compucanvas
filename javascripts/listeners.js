canvasController = {}
varsController = {}
canvasModel = {}

console.log($('.circle_label'),"first")

$(document).ready(function(){
  var canvas = new fabric.Canvas('canvas');
  canvasModel.canvas = canvas;
  resizeCanvas();
  window.onresize = resizeCanvas;
  $('.circle_label').click(function(){
    canvasController.placeCircle()
  });
  $('.line_label').click(function(){
    canvasController.placeLine()
  });
  // $('.circle_label').click(canvasController.placeCircle);
  // $('.line_label').click(canvasController.placeLine);
});

function resizeCanvas(){
  var height = $('.canvas_wrapper').height();
  var width = $('.canvas_wrapper').width();
  canvasModel.canvas.setHeight(height);
  canvasModel.canvas.setWidth(width);
  canvasModel.height = height;
  canvasModel.width = width;
}
// Has listeners for the canvas. Perhaps implement this in Backbone?
// When the canvas gets updated:

  // Update known variables
  // Update uknonw variables
  // Ask for mandatory inputs (e.g. asking for mass when an object is created)
  // Do error checking?
  // Clear console, answer, and explanation?

varsController.genObjectVars = function(){
  this.draw_var_form("Mass")
  this.draw_var_form("Velocity")
  this.draw_var_form("Acceleration")
}

varsController.draw_var_form = function(varName){
  template = $('.input_template_holder').children('.template').clone();
  template.find('.label').text(varName+"=");
  $('.known-vars').append(template)
}

varsController.genEnvVars = function(){
}

canvasController.placeCircle = function(){
  var circle = new fabric.Circle({
    radius:10,
    fill:'black',
    left:canvasModel.width/2,
    top:canvasModel.height/2
  })
  canvasModel.canvas.add(circle);
  canvasModel.canvas.renderAll();
  varsController.genObjectVars()
}

canvasController.placeLine = function(){
  var line = new fabric.Line([0, 400, 650, 400], { 
      stroke: "#000000", 
      strokeWidth: 1 
  }); 
  canvasModel.canvas.add(line);
}