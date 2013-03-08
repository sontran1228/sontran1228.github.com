$(function() {
	var zonesInLayout = ['#zone1','#zone2','#zone3', '#zone4', "#zone5", "#zone6", "#zone7", "#zone8"];
	var zonesLayout = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
	var dragObject = "DragObjectPortlet";
	
	uiDragDrop = function() {
		var applicationId='';
		var zonesInLayoutString = zonesInLayout.join(',');
		var _dragOptions = {
			cursor: "move",
			helper : function(event){
				applicationId = $(this).attr('id');
				return $(this).clone();
			},
			start : function( event, ui ) {
				var _classes = $(this).attr('class');
				if(_classes.indexOf('ZoneA') > -1) {
					$('#zone1,#zone4').css('background-color','rgb(193, 230, 193)');
				} else if(_classes.indexOf('ZoneB') > -1) {
					$('#zone2,#zone3,#zone5,#zone6,#zone7,#zone8').css('background-color','rgb(193, 230, 193)');
				}
			},
			stop : function( event, ui ) {
				$('#zone1,#zone2,#zone3,#zone4,#zone5,#zone6,#zone7,#zone8').css('background-color','white');
			}
			
		};
		
		// init drag
		$('.' + dragObject).each(function() {
			var _classes = $(this).attr('class');
			if(_classes.indexOf('ZoneA') > -1) {
				_dragOptions.connectToSortable = "#zone1, #zone4";
			} else if(_classes.indexOf('ZoneB') > -1) {
				_dragOptions.connectToSortable = "#zone2,#zone3,#zone5,#zone6,#zone7,#zone8";
			}
			$(this).draggable(_dragOptions);
		});
		
		
		// init drop
		var _currentDiv='';
		$(zonesInLayoutString).sortable({
			connectWith: zonesInLayoutString,
			placeholder: "ui-state-highlight",
			tolerance : "pointer",
			cursor: "move",
			start : function( event, ui )  {
				// change border color if item doesn't belong to this zone
				var _classes = ui.item.attr('class');
				if(_classes.indexOf('ZoneA') > -1) {
					$('#zone1,#zone4').css('background-color','rgb(193, 230, 193)');
				} else if(_classes.indexOf('ZoneB') > -1) {
					$('#zone2,#zone3,#zone5,#zone6,#zone7,#zone8').css('background-color','rgb(193, 230, 193)');
				}
			},
			over : function(event, ui) {
				$(this).css('height','auto');
			},
			out : function(event, ui) {
				$("#zone2,#zone3,#zone5,#zone6,#zone7,#zone8").css('height','auto');
				setHeight();
			},
			receive : function(event,ui) {
				var _classes = ui.item.attr('class');
				_currentDiv = $(this).attr('id');
				if($(this).attr('id') == 'zone1' || $(this).attr('id') == 'zone4') {
					if(_classes.indexOf('ZoneB') > -1) {
						$(ui.sender).sortable('cancel');
						_currentDiv = '';
					}
				} else {
					if(_classes.indexOf('ZoneA') > -1) {
						$(ui.sender).sortable('cancel');
						_currentDiv = '';
					}
				}
			},
			stop : function(event, ui) {
				var _layoutNumber = zonesLayout[zonesInLayout.indexOf('#' + _currentDiv)];
				var _item = ui.item;
				if(!_item.hasClass('application')) {
					_item.removeClass("DragObjectPortlet ui-draggable").addClass("application");
					_item.attr('id', applicationId + "-" + Math.floor(Math.random() * 1000));
					if(_layoutNumber == 1) {
						_item.addClass('application-vlayout');
						var _width = _item.width() + new Number(_item.css('margin-left').replace('px',''));
						$(this).css('width', $(this).width() + _width);
					}
				} else {
					if(_layoutNumber != undefined) {
						if(_layoutNumber == 0) {
							_item.removeClass('application-vlayout');
						} else{
							_item.addClass('application-vlayout');
						}
					}
				}
				$('#zone1,#zone2,#zone3,#zone4,#zone5,#zone6,#zone7,#zone8').css('background-color','white');
				$("#zone2,#zone3,#zone5,#zone6,#zone7,#zone8").css('height','auto');
				setHeight();
				_currentDiv = '';
			}
		});
	};
	
	setHeight = function() {
		var _temp = 0;
		if(_temp < $("#zone2").height()) {
			_temp = $("#zone2").height();
		}
		if(_temp < $("#zone3").height()) {
			_temp = $("#zone3").height();
		}
		 $("#zone2,#zone3").css('height',_temp);
		
		_temp = 0;
		if(_temp <= $("#zone5").height()) {
			_temp = $("#zone5").height();
		}
		if(_temp <= $("#zone6").height()) {
			_temp = $("#zone6").height();
		}
		if(_temp <= $("#zone7").height()) {
			_temp = $("#zone7").height();
		}
		if(_temp <= $("#zone8").height()) {
			_temp = $("#zone8").height();
		}
		$("#zone5,#zone6,#zone7,#zone8").css('height',_temp);
	};
	
	changeLayout = function(_input) {
		var _layoutNumber = zonesLayout[zonesInLayout.indexOf('#zone1')];
		var _zone1 =$('#zone1');
		var _wrapper = '<div style="width: 100%; overflow-x: auto; border: 1px solid black;"></div>';
		
		if(_layoutNumber == 0) {
			var _width = 0;
			_zone1.children('div.application').each(function() {
				$(this).addClass('application-vlayout');
				_width += $(this).width() + new Number($(this).css('margin-left').replace('px',''));
			});			
			_zone1.removeClass(_zone1.attr('class').match(/span[1-9]+/g).join(', ')).css({'border' : 'none', 'width' : _width,});
			_zone1.wrap(_wrapper);
		} else {
			_zone1.children('div.application').removeClass('application-vlayout');
			_zone1.unwrap('<div></div>');
			_zone1.css({'border' : '', 'width' : '',}).addClass('span12');
		}
		_layoutNumber = zonesLayout[zonesInLayout.indexOf('#zone1')] = (_layoutNumber == 0) ? 1 : 0;
		_input.value = (_layoutNumber == 0) ? 'Zone1: Horizontal' : 'Zone1: Vertical';
	};
});