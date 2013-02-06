$(function() {
var total = $('#zone2').width() + $('#zone3').width();
var _top = $('#zone2').position().top;
$("#zone2").resizable({
  grid: 1,
  handles: 'e',
  resize: function (event, ui) {    
    var $this = $(this);
    $this.width(ui.size.width - 1);
    var z3 = $("#zone3");
    z3.width(total - $this.width() - 1);
    
    $("#helper").find(".resize-helper").remove();
    var result = findNext($this);
    var _helper =  $("<div></div>").css({ 
      "top" : _top,
      "margin-left" : 0,
      "position" : "absolute",
      "overflow" : "hidden",
      "border" : "2px dotted #00F",
      "height" : "27px",
      "z-index" : "1019"}).addClass("span" + result).addClass("resize-helper");
    
    $("#helper").append(_helper);
  },
  
  stop: function (event, ui) {
    var $this = $(this);
    $("#helper").find(".resize-helper").remove();
    var result = findNext($this);
    
    reset($this);
    var z3 = $("#zone3");
    reset(z3);
    
    $this.addClass("span" + result);
    z3.addClass("span" + (12 - result));
  }
});

function findNext($this) {
  var tmp = $("<div></div>").css("visibility", "hidden")
                              .css("position", "absolute");
  $this.parent().append(tmp);
  
  var i = 1, prev = 0, next = 0;
  while(i <= 12 && tmp.width() < $this.width()) {
    prev = tmp.width();
    tmp.attr("class", "").addClass("span" + i++);
    next = tmp.width();
  }
  
  var result = i - 2;
  if (next - $this.width() < $this.width() - prev) {      
    result = i - 1;
  }
  tmp.remove();
  return result;
}

function reset($obj) {
  $obj.attr("class", $obj.attr("class").replace(/span\d+/g, ""));    
  $obj.css({"width" : "", "height" : ""});  
}
});