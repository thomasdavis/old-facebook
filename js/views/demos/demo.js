define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'text!templates/daybox.html',
  'text!templates/daybox_event.html',
  'libs/daybox/daybox',
  'sampledata/another_sample'
], function($, _, Backbone, Vm, dayboxTemplate, eventTemplate, Daybox, SampleData){
  var SidebarView = Backbone.View.extend({
    el: '.demo-container',
    initialize: function () {
      
    },
    render: function (sampledata) {
			var that = this;
      $(this.el).html(dayboxTemplate);  
      // Show a demo for the given requirements from email
      require(['sampledata/' + this.options.sampledata], function(sampleData) {
        var daybox = new Daybox({
          events: sampleData
        });
        daybox.render({
          container: '.daybox-container',
          eventTemplate: eventTemplate
        });
        console.log(daybox);
      })
		} 
	});
  return SidebarView;
});
