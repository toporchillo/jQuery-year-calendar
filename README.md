<h1>Hello, Alexander!</h1>
<h1>jQuery year calendar</h1>
JavaScript event calendar which displays whole year. It supports day colorifying, day markers, events.

Based on <a href="http://github.com/iamjpg/jQuery-Verbose-Calendar">jQuery Verbose Calendar</a> by John Patrick Given

<b>Demo: http://sourcedistillery.com/demo/jquery-year-calendar/</b>

<h2>Key features</h2>
- displays whole year;
- colorizes days;
- allows to select date range by drag and drop;
- displays and allows to highlight periods;
- marks particular days;

<h2>Important source files</h2>
- calendar.css - Calendar CSS style
- index.html - HTML entrypoint
- calendar_init.js - JavaScript to init and customise calendar
- jquery.year_calendar.js - jQuery plugin, the calendar itself

<h2>Contributing</h2>
Pull requests are wellcome. Please, check open issues if you don't know how to contribute.

<h2>Quick start</h2>
```javascript
//Days colorify
var date_styles = [
  { start:new Date(2012, 11, 1), end:new Date(2013, 2, 1), title:'Winter 2012-2013', color: '#efefef' },
  { start:new Date(2013, 2, 1), end:new Date(2013, 5, 1), title:'Spring 2013', color: '#a0d3e3' },
  { start:new Date(2013, 5, 1), end:new Date(2013, 8, 1), title:'Summer 2013', color: '#bed984' },
  { start:new Date(2013, 8, 1), end:new Date(2013, 11, 1), title:'Autumn 2013', color: '#ffb258' },
  { start:new Date(2013, 11, 1), end:new Date(2014, 2, 1), title:'Winter 2013-2014', color: '#efefef' }
];

//Events to click
var events = [
  {_id: '1', start:new Date(2012, 11, 29, 12, 0 ,0), end:new Date(2013, 0, 12, 12, 0 ,0),
   title:'Winter school vacation' },
  { _id: '2', start:new Date(2013, 2, 23, 12, 0 ,0), end:new Date(2013, 2, 30, 12, 0 ,0),
   title:'Spring school vacation' },
  { _id: '3', start:new Date(2013, 10, 2, 12, 0 ,0), end:new Date(2013, 10, 9, 12, 0 ,0),
   title:'Autumn school vacation' },
  { _id: '4', start:new Date(2013, 11, 28, 12, 0 ,0), end:new Date(2014, 0, 11, 12, 0 ,0),
   title:'Winter school vacation' }
];

//Day marker (orange corner) for 5th of November
var markers = [
 { date:new Date(2013, 10, 5), title: 'My Birdtday'}
];

//Alert on event click
var event_click = function(evt) {
	var _id = evt.data('_id');
	$.each(events, function(i, e) {
		if (e._id == _id)
			alert(e.title);
	});
}

//Select range
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

//Click day marker
var marker_click = function(evt) {
	alert(evt.data('title'));
}

$("#calendar-holder").year_calendar({
	//year: 2013, // Optional, defaults to current year - pass in a year - Integer or String
	scroll_to_date: true, // Scroll to the current date?,
	date_styles: date_styles, // Optional
	events: events, // Optional
	event_click: event_click, // Optional
	range_select: range_select, // Optional
	range_unselect: range_unselect,  // Optional
	markers: markers, // Optional
	marker_click: marker_click // Optional
});
```

<h2>License (MIT)</h2>
Copyright (c) 2013 Alexander Toporkov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
