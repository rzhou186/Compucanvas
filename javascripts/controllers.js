var canvasController = {}
var varsController = {}
var canvasModel = {}
var consolesController = {}
var namesController = {}
var allObjs = []
var currentSquare = {}

var counter = 0;
var vector_counter = 0;

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
    case "f":
      return "Force"
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
    case "Force":
      return "f"
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
    case "f":
      return "N"
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
  $("#console").append("<p>" + message + "</p>");
}

consolesController.logAnswer = function(message){
  $("#answer").append("<p>" + message + "</p>");
}

consolesController.logBacktrace = function(message){
  $("#backtrace").append("<p>" + message + "</p>");
}

varsController.genObjectVars = function(kinObjName){
  this.insertObjectOpt(kinObjName)
  this.drawKinObjDiv(kinObjName)
}

properties = ["Initial Position","Final Position","Initial Velocity","Final Velocity","Acceleration","Final Time"]

varsController.drawKinObjDiv = function(kinObjName){
  var template = $('.kin_obj_holder').find('.kinObj').clone()
  template.find('.name').html(kinObjName)
  template.attr('data-kin_obj_num',counter)
  
  $('.input-bar .variables').html("")
  var varTemplate = $('.input_template_holder').children('.template').clone();
  varTemplate.find('.label').text('Mass');
  varTemplate.find('input').addClass("Mass").attr('data-type',"Mass")
  template.find(".vars").append(varTemplate)
  varsController.insertVarOpt("Mass");
  varsController.insertVarOpt("Final Time");

  for(var i=0;i<properties.length-1;i++){
    varName = properties[i];
    varTemplate = $('.vector_input_template_holder').children('.template').clone();
    varTemplate.find('.label').text(varName);
    varTemplate.find('input').addClass(varName.replace(" ","-")).attr('data-type',varName.replace(" ","-"))
    template.find(".vars").append(varTemplate)
    varsController.insertVarOpt(varName);
  }

  $('.known-vars').append(template)
}


varsController.drawVectorDiv = function(){
  console.log("running")
  var template = $('.drawn_vector_holder').find('.vector').clone()
  template.find('.name').html('Vector '+vector_counter)
  template.attr('data-vector_num',vector_counter)

  varTemplate = $('.vector_input_template_holder').children('.template').clone().addClass('vector');
  varTemplate.find('.label').text('Force')
  template.find('.vars').html(varTemplate)

  $('.known-vars').append(template)
  vector_counter++;
}

varsController.updateAllKinObjs = function(){
  var kinObj = kinObjs[0]
  for(i=0;i<kinObjs.length;i++)
  {
    $('.kinObj[data-kin_obj_num=0] .template').each(function(){
      if($(this).find('input').length == 1 && $(this).find('input').val() != ""){
        kinObj.addVector(namesController.readableToShort($(this).find('input').data('type').replace("-"," ")), parseFloat($(this).find('input:first').val()))}
      else if($(this).find('input:first').val()!="" ){
        kinObj.addVector(
          namesController.readableToShort($(this).find('input:first').data('type').replace("-"," ")),
           parseFloat($(this).find('input:first').val()),
           parseFloat($(this).find('input:last').val())
        )
      }
    })
    if ($('.Initial-Time').val().length >0)
      {kinObj.addVector('t0',parseFloat($('.Initial-Time').val()))}
    if ($('.Final-Time').val().length >0)
      {kinObj.addVector('t1',parseFloat($('.Final-Time').val()))}
    if ($('.template.vector').length > 0){
      $('.template.vector').each(function(){
        if($(this).find('input:first').val()){
        kinObj.addVector(
          ('f'),
           parseFloat($(this).find('input:first').val()),
           parseFloat($(this).find('input:last').val())
        )}
      })
    }
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

canvasController.genSquare = function(){
  kinObjName = 'Object '+counter
  varsController.genObjectVars(kinObjName)
  kinObjs[0] = new KinObj(kinObjName);
  obj = kinObjs[0]
  obj.addVector('t0', 0);
  counter++;
}

canvasController.drawLine = function(cords){
  console.log('line')
  this.canvas.beginPath();
  this.canvas.moveTo(cords.x1, cords.y1);
  this.canvas.lineTo(cords.x2, cords.y2);
  this.canvas.stroke(); 
}

canvasController.drawArrow = function(cords){
  console.log('arrow')
  this.canvas.beginPath();
  canvas_arrow(this.canvas,cords.x1,cords.y1,cords.x2,cords.y2)
  this.canvas.stroke(); 
}

function canvas_arrow(context, fromx, fromy, tox, toy){
  var headlen = 10;   // length of head in pixels
  var angle = Math.atan2(toy-fromy,tox-fromx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
  context.moveTo(tox, toy);
  context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
}

canvasController.drawSquare = function(cords){
  this.canvas.beginPath();
  this.canvas.strokeStyle = "black";
  this.canvas.rect(cords.x1, cords.y1,Math.abs(cords.x2-cords.x1),Math.abs(cords.y2-cords.y1));
  this.canvas.stroke();
}

canvasController.saveArrow = function(cords){
  allObjs.push({type:'arrow',cords:{x1:cords.x1,y1:cords.y1,x2:cords.x2,y2:cords.y2}});
}

canvasController.saveLine = function(cords){
  allObjs.push({type:'line',cords:{x1:cords.x1,y1:cords.y1,x2:cords.x2,y2:cords.y2}});
}
canvasController.saveSquare = function(cords){
  allObjs.push({type:'square',cords:{x1:cords.x1,y1:cords.y1,x2:cords.x2,y2:cords.y2}});
  currentSquare = {type:'square',cords:{x1:cords.x1,y1:cords.y1,x2:cords.x2,y2:cords.y2}}
}
canvasController.renderAll = function(){
  width = $('.canvas_wrapper').width()
  for(i=0;i<allObjs.length;i++){
    if(allObjs[i].type == 'line')
      {this.drawLine(allObjs[i].cords)}
    else if(allObjs[i].type == 'square')
      {this.drawSquare(allObjs[i].cords)}
    else if(allObjs[i].type == 'arrow')
      { this.drawArrow(allObjs[i].cords)}
  }
}

consolesController.clear = function(){
  $('.console').children(".contents").html("")
  $('.answer').children(".contents").html("")
  $('.backtrace').children(".contents").html("")
}
