canvasController = {}
varsController = {}
canvasModel = {}
consolesController = {}
namesController = {}

var counter = 0;

namesController.shortToReadable = function(short_var){
  switch(short_var)
  {
    case "m":
      return "Mass"
    case "v0":
      return "Initial Velocity"
    case "v1":
      return "Final Velocity"
    case "a":
      return "Acceleration"
    case "x0":
      return "Initial Position"
    case "x1":
      return "Final Position"
    case "t0":
      return "Initial Time"
    case "t1":
      return "Final Time"
  };
}

namesController.readableToShort = function(long_var){
  switch(long_var)
  {
    case "Mass":
      return "m"
    case "Initial Velocity":
      return "v0"
    case "Final Velocity":
      return "v1"
    case "Acceleration":
      return "a"
    case "Initial Position":
      return "x0"
    case "Final Position":
      return "x1"
    case "Initial Time":
      return "t0"
    case "Final Time":
      return "t1"
  };
}

namesController.shortToUnits = function(short_var){
  switch(short_var)
  {
    case "m":
      return "kg"
    case "v0":
    case "v1":
      return "m/s"
    case "a":
      return "m/s^2"
    case "x0":
    case "x1":
      return "m"
    case "t0":
    case "t1":
      return "s"
    default:
      return ""
  };
}

canvasController.resizeCanvas = function(){
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

consolesController.logConsole = function(message){
  $(".console").append("<p>" + message + "</p>");
  $(".console").animate({ scrollTop : 1000000 }, "fast");
}

consolesController.logAnswer = function(message){
  $(".answer").append("<p>" + message + "</p>");
  $(".answer").animate({ scrollTop : 1000000 }, "fast");
}

consolesController.logBacktrace = function(message){
  $(".backtrace").append("<p>" + message + "</p>");
  $(".backtrace").animate({ scrollTop : 1000000 }, "fast");
}

varsController.genObjectVars = function(kinObjName){
  this.insertObjectOpt(kinObjName)
  this.drawKinObjDiv(kinObjName)
}

properties = ["Mass","Initial Position","Final Position","Initial Velocity","Final Velocity","Acceleration"]

varsController.drawKinObjDiv = function(kinObjName){
  var template = $('.kin_obj_holder').find('.kinObj').clone()
  template.find('.name').html(kinObjName)
  template.attr('data-kin_obj_num',counter)
  
  $('.input-bar .variables').html("")
  for(var i=0;i<properties.length;i++){
    varName = properties[i];
    varTemplate = $('.input_template_holder').children('.template').clone();
    varTemplate.find('.label').text(varName+"=");
    varTemplate.find('input').attr('class',varName.replace(" ","-")+" "+"var_input").attr('data-type',varName.replace(" ","-"))
    template.find(".vars").append(varTemplate)
    varsController.insertVarOpt(varName);
  }

  $('.known-vars').append(template)
}

varsController.updateAllKinObjs = function(){
  for(i=0;i<kinObjs.length;i++)
  {
    var kinObj = kinObjs[0]
    $('.kinObj[data-kin_obj_num=0] input').each(function(){
      kinObj.setVar(namesController.readableToShort($(this).data('type').replace("-"," ")), parseFloat($(this).val()))
    })
    if ($('.Initial-Time').val().length >0)
      kinObj.setVar('t0',parseFloat($('.Initial-Time').val()))
    if ($('.Final-Time').val().length >0)
      kinObj.setVar('t1',parseFloat($('.Final-Time').val()))
  }
}

varsController.insertObjectOpt = function(kinObjName){
  $('.input-bar .kinObjects').append($('.option_holder').find('.option').clone().html(kinObjName).val(counter));
}

varsController.drawVars = function(varName){
  this.drawVarForm(varName);
  this.insertVarOpt(varName);
}

varsController.insertVarOpt = function(varName){
  var short_var_name = namesController.readableToShort(varName)
  $('.input-bar .variables').append($('.option_holder').find('.option').clone().html(varName).val(short_var_name))
}

canvasController.genCircle = function(){
  var circle = new fabric.Circle({
    radius:10,
    fill:'black',
    left:canvasModel.width/2,
    top:canvasModel.height/2
  })
  canvasModel.canvas.add(circle);
  canvasModel.canvas.renderAll();

  kinObjName = 'Object '+counter
  varsController.genObjectVars(kinObjName)
  kinObjs[counter] = new KinObj(kinObjName);
  obj = kinObjs[counter]
  obj.setVar('t0', 0);
  // obj.setVar('a', -9.8);
  counter++;
}

canvasController.placeLine = function(){
  var line = new fabric.Line([0, 400, 650, 400], { 
      stroke: "#000000", 
      strokeWidth: 1 
  }); 
  canvasModel.canvas.add(line);
}
