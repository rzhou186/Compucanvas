canvasController = {}
varsController = {}
canvasModel = {}
consolesController = {}
namesController = {}
allObjs = []

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
    $('.kinObj[data-kin_obj_num=0] input').filter(function() { return this.value != ""; }).each(function(){
      kinObj.setVar(namesController.readableToShort($(this).data('type').replace("-"," ")),$(this).val())
    })
    if ($('.Initial-Time').val().length >0)
      kinObj.setVar('t0',parseInt($('.Initial-Time').val()))
    if ($('.Final-Time').val().length >0)
      kinObj.setVar('t1',parseInt($('.Final-Time').val()))
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
  // var circle = new fabric.Circle({
  //   radius:10,
  //   fill:'black',
  //   left:canvasModel.width/2,
  //   top:canvasModel.height/2
  // })
  // canvasModel.canvas.add(circle);
  // canvasModel.canvas.renderAll();

  kinObjName = 'Object '+counter
  varsController.genObjectVars(kinObjName)
  kinObjs[counter] = new KinObj(kinObjName);
  obj = kinObjs[counter]
  obj.setVar('t0', 0);
  obj.setVar('a', -9.8);
  counter++;
}

canvasController.drawLine = function(cords){
  this.canvas.beginPath();
  this.canvas.moveTo(cords.x1, cords.y1);
  this.canvas.lineTo(cords.x2, cords.y2);
  this.canvas.stroke(); 
}

canvasController.drawSquare = function(cords){
  this.canvas.beginPath();
  this.canvas.strokeStyle = "black";
  this.canvas.rect(cords.x1, cords.y1,Math.abs(cords.x2-cords.x1),Math.abs(cords.y2-cords.y1));
  this.canvas.stroke();
}

canvasController.saveLine = function(cords){
  this.canvas.clearRect(0, 0, canvas.width, canvas.height)
  allObjs.push({type:'line',cords:{x1:cords.x1,y1:cords.y1,x2:cords.x2,y2:cords.y2}});
}
canvasController.saveSquare = function(cords){
  this.canvas.clearRect(0, 0, canvas.width, canvas.height)
  allObjs.push({type:'square',cords:{x1:cords.x1,y1:cords.y1,x2:cords.x2,y2:cords.y2}});
}
canvasController.renderAll = function(){
  width = $('.canvas_wrapper').width()
  for(i=0;i<allObjs.length;i++){
    if(allObjs[i].type == 'line')
      {this.drawLine(allObjs[i].cords)}
    else if(allObjs[i].type == 'square')
      {this.drawSquare(allObjs[i].cords)}
  }
}

consolesController.clear = function(){
  $('.rightbar').children().html("")
}
