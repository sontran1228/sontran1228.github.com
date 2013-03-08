$(function() {
	
	var zone = Backbone.Model.extend({
		defaults : function() {
			return {
				name : '',
				arrangement : 0,
				items : [],
				restrictions : []
			};
		},
		
		setItem : function(id) {
			this.save({items : this.items.push(id)});
		},
		
		setRestrictions : function(id) {
			this.save({restrictions : this.restrictions.push(id)});
		},
		
		setArrangement : function(arrangement) {
			this.save({arrangement : arrangement});
		}
	});
	
	var layout = Backbone.Collection.extend({
		
		mode : zone,
		
		localStorage: new Backbone.LocalStorage("layout-dnd")
	});
});