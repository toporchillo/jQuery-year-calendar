/*
	jQuery Year Calendar
	https://github.com/toporchillo/jQuery-year-calendar/

	inspired by "jQuery Verbose Calendar" by John Patrick Given


	MIT License

	Copyright (c) 2013 Alexander Toporkov (toporchillo@gmail.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function () {
	function setup ($) {
		//
		// Globals
		var pluginName = 'year_calendar',
			pl = null,
			d = new Date();

		//
		// Defaults
		defaults = {
			d: d,
			year: d.getFullYear(),
			today: d.getDate(),
			month: d.getMonth(),
			current_year: d.getFullYear(),
			scroll_to_date: true,
			events: [],
			date_styles: [],
			event_click: null,
			day_click: null,
			range_select: null,
			range_unselect: null,
			markers: [],
			marker_click: null
		};

		month_array = [
			'DEC',
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'MAY',
			'JUN',
			'JUL',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC',
			'JAN'
		];

		month_days = [
			'31',
			'31', // jan
			'28', // feb
			'31', // mar
			'30', // apr
			'31', // may
			'30', // june
			'31', // july
			'31', // aug
			'30', // sept
			'31', // oct
			'30', // nov
			'31',  // dec
			'31'
		];

		week_days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

		//
		// Main Plugin Object
		function Calendar(element, options) {
			pl = this;
			this.element = element;
			this.options = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;


			//
			// Begin
			this.init();
		}

		//
		// Init
		Calendar.prototype.init = function() {
			this.print();
		}

		Calendar.prototype.print = function(year) {
			//
			// Pass in any year you damn like.
			var the_year = (year) ? parseInt(year) : parseInt(pl.options.year);

			//
			// First, clear the element
			$(this.element).empty();

			//
			// Append parent div to the element
			$(this.element).append('<div id=\"year-calendar\"></div>');

			//
			// Set reference for calendar DOM object
			var $_calendar = $('#year-calendar');

			//
			// Status data
			$_calendar.append('<div id=\"status\"><div id=\"hover\"></div><div id=\"selection\"></div></div>');

			//
			// Navigation arrows
			$_calendar.append('<div id=\"arrows\"></div>');


			//
			// DOM object reference for arrows
			$_arrows = $('#arrows');
			// Let's append the year
			$_arrows.append('<div class=\"prev\ btn">&laquo;</div>');
			for (var i=0; i<the_year.toString().length; i++) {
				var o = the_year.toString()[i];
				$_arrows.append('<div class=\"year\">' + o + '</div>');
			}
			$_arrows.append('<div class=\"next btn\">&raquo;</div>');

			//
			// Add a clear for the floated elements
			$_calendar.append('<div class=\"clear\"></div>');

			$_calendar.append('<div class=\"label label-calendar bold\"></div>');
			for (j = 1; j <= 31; j++) {
				$_calendar.append('<div class=\"label label-calendar header\">'+j+'</div>');
			}

			//
			// Loop over the month arrays, loop over the characters in teh string, and apply to divs.
			$.each(month_array, function(i, o) {
				if (i==1 || i==13)
					$_calendar.append('<div class=\"yearbrake\"></div>');

				//
				// Create a scrollto marker
				$_calendar.append('<div class=\"label label-calendar bold\">' + o + '</div>');

				//
				// Check for leap year
				if (o === 'FEB') {
					if (pl.isLeap(the_year)) {
						month_days[i] = 29;
					} else {
						month_days[i] = 28;
					}
				}

				for (j = 1; j <= parseInt(month_days[i]); j++) {
					//
					// Check for today
					var today = '';
					if ((i-1) === pl.options.month && the_year === d.getFullYear()) {
						if (j === pl.options.today) {
							today = 'today';
						}
					}

					mon = parseInt(i);
					if (mon == 0)
						var date = new Date(12 + '/' + j + '/' + (the_year-1));
					else if (mon == 13)
						var date = new Date(1 + '/' + j + '/' + (the_year+1));
					else
						var date = new Date(mon + '/' + j + '/' + the_year);
					date.setHours(12,0);
					var da = date.getDay();
					var da_label = week_days[da];
					weekend = '';
					if (da == 0 || da == 6) weekend = ' weekend';

					var evt = '';
					$.each(pl.options.events, function(i,v) {
						var v_start = v.start;
						var v_end = v.end;
						var style = (v.type ? ' '+v.type : '')
						if (v_end.valueOf() == date.valueOf()) {
							evt = '<div class="events event-end'+style+'" data-_id="'+v._id+'"></div>';
							return;
						}
						else if (v_start.valueOf() == date.valueOf()) {
							evt = evt + '<div class="events event-start'+style+'" data-_id="'+v._id+'"></div>';
							return;
						}
						else if (v_start.valueOf() < date.valueOf() && v_end.valueOf() > date.valueOf()) {
							evt = '<div class="events event'+style+'" data-_id="'+v._id+'"></div>';
							return;
						}
					});

					var marker = '';
					$.each(pl.options.markers, function(i,m) {
						var v = m.date.setHours(12,0);
						if (v.valueOf() == date.valueOf()) {
							marker = '<div class="markers" data-title="' + m.title + '"></div>';
							return;
						}
					});

					var day_label = '';
					var day_color = '';
					$.each(pl.options.date_styles, function(i,v) {
						if (v.start.valueOf() <= date.valueOf() && v.end.valueOf() >= date.valueOf()) {
							day_label = ' '+v.label;
							day_color = v.color;
							return;
						}
					});

					//
					// Looping over numbers, apply them to divs
					var cell = $("<div data-date='" + (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear() + "' class='label label-calendar day " + today + weekend + day_label + "' style='background-color: " + day_color + ";'>" + da_label + evt + marker + '</div>');
					$_calendar.append(cell);
				}

				//
				// Add a clear for the floated elements
				$_calendar.append('<div class=\"clear\"></div>');
			});

			$_calendar.append('<div id=\"legend\"></div>');
			$_legend = $('#legend');
			$.each(pl.options.date_styles, function(i,style) {
				$_legend.append('<div class="legend-item"><div class=\"label label-calendar day ' + style.label + '\" style="background-color: ' + style.color + ';"></div><span>' + style.title + '</span></legend-item>');
			})
		}

		//
		// Previous / Next Year on click events
		$(document).on('click', '#year-calendar #arrows .next', function() {
			pl.options.year = parseInt(pl.options.year) + 1;

			pl.print(pl.options.year);
		});

		$(document).on('click', '#year-calendar #arrows .prev', function() {
			pl.options.year = parseInt(pl.options.year) - 1;

			pl.print(pl.options.year);
		});

		$(document).on('mouseover', '#year-calendar .day', function() {
			$('#year-calendar #hover').html($(this).data('date'));
		});
		$(document).on('mouseout', '#year-calendar .day', function() {
			$('#year-calendar #hover').html('');
		});

		$(document).on('mousedown', '#year-calendar .events', function(e) {
			e.stopPropagation();
		})

		$(document).on('mousedown', '#year-calendar .markers', function(e) {
			e.stopPropagation();
		})

	/*
		$(document).on('mouseup', '#year-calendar .events', function(e) {
			e.stopPropagation();
		})
	*/

		$(document).on('click', '#year-calendar .events', function(e) {
			e.stopPropagation();
			$('#year-calendar .events').removeClass('selected');
			$('#year-calendar .markers').removeClass('selected');
			$('#year-calendar .events[data-_id="'+$(this).data('_id')+'"]').addClass('selected');
			if ($.isFunction(pl.options.event_click)){
				pl.options.event_click($(this));
			}
		});

		$(document).on('click', '#year-calendar .markers', function(e) {
			e.stopPropagation();
			$('#year-calendar .events').removeClass('selected');
			$('#year-calendar .markers').removeClass('selected');
			$('#year-calendar .markers[data-_id="'+$(this).data('_id')+'"]').addClass('selected');
			if ($.isFunction(pl.options.marker_click))
				pl.options.marker_click($(this));
		});

		$(document).on('click', 'body', function(e) {
			$('#year-calendar .events').removeClass('selected');
			$('#year-calendar .markers').removeClass('selected');
		})


		$(document).on('click', '#year-calendar .day', function(e) {
			$('#year-calendar .events').removeClass('selected');
			$('#year-calendar .markers').removeClass('selected');
			if ($.isFunction(pl.options.day_click))
				pl.options.day_click($(this));
		})

		$(document).on('mousedown', '#year-calendar .day', function(e) {
			e.preventDefault();
			if (DAY_SELECTED || DAY_SELECTED2)
				cancelSelect();
			startSelect($(this));
		})

		$(document).on('mouseup', '#year-calendar .day', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (DAY_SELECTED && !DAY_SELECTED2)
				endSelect($(this));
		})

		var DAY_SELECTED = null;
		var DAY_SELECTED2 = null;
		var dindex = null;
		function startSelect(day) {
			$('#year-calendar .day').removeClass('selected');
			DAY_SELECTED = day;
			dindex = day.index("#year-calendar .day");
			$(document).on('mouseover', '#year-calendar .day', selectRangeOver);
			$(document).on('mouseout', '#year-calendar .day', selectRangeOut)
		}

		var selectRangeOver = function(e) {
			var idx = $(this).index("#year-calendar .day");
			$('#year-calendar .day').filter(':lt('+(dindex+1)+'):gt('+(idx-1)+')').addClass('selected');
			$('#year-calendar .day').filter(':lt('+(idx+1)+'):gt('+(dindex-1)+')').addClass('selected');
		}
		var selectRangeOut = function(e) {
			$('#year-calendar .day').removeClass('selected');
			$(DAY_SELECTED).addClass('selected');
		}

		function endSelect(day) {
			DAY_SELECTED2 = day;
			if (new Date(DAY_SELECTED2.data('date')) < new Date(DAY_SELECTED.data('date'))) {
				tmp = DAY_SELECTED;
				DAY_SELECTED = DAY_SELECTED2;
				DAY_SELECTED2 = tmp;
			}
			day.addClass('selected');
			$(document).off('mouseover', '#year-calendar .day', selectRangeOver);
			$(document).off('mouseout', '#year-calendar .day', selectRangeOut);
			$('#year-calendar #selection').html(DAY_SELECTED.data('date')+' - '+DAY_SELECTED2.data('date'));
			if ($.isFunction(pl.options.range_select))
				pl.options.range_select(DAY_SELECTED, DAY_SELECTED2);
			dindex = null;
		}

		function cancelSelect() {
			DAY_SELECTED = null;
			DAY_SELECTED2 = null;
			$('#year-calendar .day').removeClass('selected');
			$(document).off('mouseover', '#year-calendar .day', selectRangeOver);
			$(document).off('mouseout', '#year-calendar .day', selectRangeOut);
			$('#year-calendar #selection').html('');
			$.isFunction(pl.options.range_unselect);
			pl.options.range_unselect();
			dindex = null;
		}


		//
		// Simple JS function to check if leap year
		Calendar.prototype.isLeap = function(year) {
			var leap = 0;
			leap = new Date(year, 1, 29).getMonth() == 1;
			return leap;
		}

		//
		// Method to return full date
		Calendar.prototype.returnFormattedDate = function(date) {
			var returned_date;
			var d = new Date(date);
			var da = d.getDay();

			if (da === 1) {
				returned_date = 'Monday';
			} else if (da === 2) {
				returned_date = 'Tuesday';
			} else if (da === 3) {
				returned_date = 'Wednesday';
			} else if (da === 4) {
				returned_date = 'Thursday';
			} else if (da === 5) {
				returned_date = 'Friday';
			} else if (da === 6) {
				returned_date = 'Saturday';
			} else if (da === 0) {
				returned_date = 'Sunday';
			}

			return returned_date;
		}

		//
		// Plugin Instantiation
		$.fn[pluginName] = function(options ) {
			return this.each(function() {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Calendar(this, options));
				}
			});
		}
	}

	/*global define:true */
	if (typeof define === 'function' && define.amd && define.amd.jQuery) {
		define(['jquery'], setup);
	} else {
		setup(jQuery);
	}
})();
