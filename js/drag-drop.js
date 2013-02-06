$(function() {
	uiDragDrop = function(dragObject, zonesInLayout) {
		var applicationId='';
		var zonesInLayoutString = zonesInLayout.join(',');
		
		// init drag
		$('.' + dragObject).draggable({
			connectToSortable: zonesInLayoutString,
			cursor: "move",
			helper : function(event){
				applicationId = $(this).attr('id');
				return $(this).clone();
			},
			stop : function(event,ui) {
				$(document).off("keydown");
			}, 
			drag : function(event,ui) {
				$(document).on("keydown", function(event){
					if(event.keyCode === 27) {
						ui.helper.trigger( "mouseup" );
					}
				});
			}
		});
		
		// init drop		
		$(zonesInLayoutString).droppable({
			accept: ":not(.ui-sortable-helper)",
			tolerance : 'touch'
		}).sortable({
			connectWith: zonesInLayoutString,
			items: ".application",
			placeholder: "ui-state-highlight",
			cursor: "move",
			over : function(event, ui) {
				$(this).css('height','auto');
			},
			out : function(event, ui) {
				setHeight();
			},
			stop : function(event, ui) {
				if(!ui.item.hasClass('application')) {
					var _item = ui.item;
					_item.removeClass("DragObjectPortlet ui-draggable").addClass("application");
					_item.attr('id', applicationId + "-" + Math.floor(Math.random() * 1000));
				}
				$("#zone2,#zone3,#zone5,#zone6,#zone7,#zone8").css('height','auto');
				setHeight();
			}
		});
	};
	
	setHeight = function(zoneid) {
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
});
