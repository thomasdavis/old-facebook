define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'text!templates/sidebar.html',
], function($, _, Backbone, Vm, sidebarTemplate){
  var SidebarView = Backbone.View.extend({
    el: '.sidebar-container',
    initialize: function () {
      
    },
    render: function () {
			var that = this;
      $(this.el).html(sidebarTemplate);    
		} 
	});
  return SidebarView;
});
