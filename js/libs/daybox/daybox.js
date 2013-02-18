// Facebook - Code Assignment
// Daybox API
// 2012 Thomas Davis <thomasalwyndavis@gmail.com>

// The Daybox API is wrapped in an AMD module.
// We use jQuery for rendering and Underscore for utils.
define([
  'jquery',
  'underscore'
], function($, _){

  // We are just setting a static width for this library matching the code
  // assignment requirements
  var dayboxWidth =  600;

  // This module returns a constructor which returns an object containing the
  // events. e.g. ```var daybox = new Daybox({events: events});```
  // It simply wraps the required function ```layOutDay()```
  var DayBox = function (options) {
    this.events = options.events || [];
    this.events = layOutDay(this.events);
  };

  // ## layOutDay()  
  // ```layOutDay()``` takes an array of events with ```{id:'',end:0,start:0}```
  // and returns an array of events with new properties  ```{left:0, width: 0, top: 0}```
  var layOutDay = function (events) {
    
    // Sort the stacks by the start time, to make calculations easier
    events = _.sortBy(events, function(event){ return event.start; });

    var columnCount = 0;
    var stacks = [];
    var stack = {end: 0};

    // Loop through each event
    _.each(events, function(event, index){

      // Each event gets placed in a stack. A stack remembers how many 
      // columns there are currently overlapping and the latest end time.
      // If the current event starts after the stack, we create a new stack
      // containing the current event.
      if(event.start >= stack.end || stacks.length === 0) {
        stacks.push({columns: [{end: 0}], end: 0});
        stack = _.last(stacks);
        columnCount = 0;
      };
      
      // Set the currents end date to the stacks end time if it is larger
      if(event.end >stack.end) {
        stack.end = event.end;
      }

      // We keep track of what column the event should be placed in. By default
      // it assumes there will be a new column each time there is a new event
      event.column = columnCount;

      // Sometimes there will be room in previous columns and a new column
      // won't be required. We loop through the previous columns to check if any
      // have enough room. Each column has an end time so we don't overlap them.
      var foundSparePlace = _.any(stack.columns, function(currentColumn, index) {
        if(columnCount !== 0 && event.start > currentColumn.end) {
          event.column = index;
          return true;
        } 
      });

      // Update the columns end time to the current events end time
      stack.columns[event.column] = {
        end: event.end
      };

      // If we found a spare place in a previous column for the event
      // we do not need to add a new column
      if(!foundSparePlace) {
        columnCount++;
      }

      // Attach the current stack to the current event so we can run some calcs
      event.stack = stack;
    });

    // Now that we have all the neccesary information, let's generate the
    // appropriate output.
    _.each(events, function(event) {
      event.left = dayboxWidth / event.stack.columns.length * event.column;
      event.width = dayboxWidth / event.stack.columns.length;
      event.top = event.start;
      delete event.column;
      delete event.stack;
    });

    return events;
  };

  // ## Daybox Rendering
  // After instantiating a new Daybox object call ```daybox.render()``` to
  // append it the page into a container called ```.daybox-container```.  
  DayBox.prototype.render = function (options) {
    _.each(this.events, function(event, index){
      var eventElement = $('<div>').css({
        left: event.left + 'px',
        width: event.width + 'px',
        height: event.end-event.start + 'px',
        top: event.top + 'px'
      });
      eventElement.addClass('daybox-event');
      eventElement.html(options.eventTemplate);
      eventElement.appendTo('.daybox-container');
    });
  }

  // return the constructor
  return DayBox; 
});