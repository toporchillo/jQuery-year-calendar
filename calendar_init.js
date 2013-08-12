function initCalendar() {
	//Days colorify
	var date_styles = [
		{ start:new Date(2012, 11, 1), end:new Date(2013, 2, 1), label:'label-winter', title:'Winter 2012-2013', color: '#efefef' },
		{ start:new Date(2013, 2, 1), end:new Date(2013, 5, 1), label:'label-spring', title:'Spring 2013', color: '#a0d3e3' },
		{ start:new Date(2013, 5, 1), end:new Date(2013, 8, 1), label:'label-summer', title:'Summer 2013', color: '#bed984' },
		{ start:new Date(2013, 8, 1), end:new Date(2013, 11, 1), label:'label-autumn', title:'Autumn 2013', color: '#ffb258' },
		{ start:new Date(2013, 11, 1), end:new Date(2014, 2, 1), label:'label-winter', title:'Winter 2013-2014', color: '#efefef' }
	];

	//Events to click
	var events = [
		{ _id: '1', start:new Date(2012, 11, 29, 12, 0 ,0), end:new Date(2013, 0, 12, 12, 0 ,0), title:'Winter school vacation', type: 'type-1' },
		{ _id: '2', start:new Date(2013, 2, 23, 12, 0 ,0), end:new Date(2013, 2, 30, 12, 0 ,0), title:'Spring school vacation', type: 'type-2' },
		{ _id: '3', start:new Date(2013, 10, 2, 12, 0 ,0), end:new Date(2013, 10, 9, 12, 0 ,0), title:'Autumn school vacation', type: 'type-3' },
		{ _id: '4', start:new Date(2013, 11, 28, 12, 0 ,0), end:new Date(2014, 0, 11, 12, 0 ,0), title:'Winter school vacation', type: 'type-4' }
	];

	//Orange corners
	var markers = [
		{ date:new Date(2013, 0, 1), title: 'New year'},
		{ date:new Date(2013, 0, 7), title: 'Christmas'},
		{ date:new Date(2013, 1, 23), title: 'Army day'},
		{ date:new Date(2013, 2, 8), title: 'Women\'s day'},
		{ date:new Date(2013, 4, 1), title: 'Labor day'},
		{ date:new Date(2013, 4, 9), title: 'Victory day'},
		{ date:new Date(2013, 5, 12), title: 'Independence day'},
		{ date:new Date(2013, 10, 4), title: 'Reconciliation day'},
		{ date:new Date(2014, 0, 1), title: 'New year'},
		{ date:new Date(2014, 0, 7), title: 'Christmas'}
	];

	var event_click = function(evt) {
		var _id = evt.data('_id');
		$.each(events, function(i, e) {
			if (e._id == _id)
				alert(e.title);
		});
	}

	var range_select = function(day1, day2) {
		var d1 = new Date(day1.data('date'));
		var d2 = new Date(day2.data('date'));
		d1.setHours(12,0);
		d2.setHours(12,0);
		selected_range_start = d1;
		selected_range_end = d2;
	}

	var range_unselect = function() {
		selected_range_start = false;
		selected_range_end = false;
	}

	var marker_click = function(evt) {
		alert(evt.data('title'));
	}

	$("#calendar-holder").year_calendar({
		//year: 2012, // Optional, defaults to current year - pass in a year - Integer or String
		scroll_to_date: true, // Scroll to the current date?,
		date_styles: date_styles,
		events: events,
		event_click: event_click,
		//day_click: day_click,
		range_select: range_select,
		range_unselect: range_unselect,
		markers: markers,
		marker_click: marker_click
	});
}

$(document).ready(function() {
	initCalendar();
})
