define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'text!templates/layout.html',
  'views/sidebar'
], function($, _, Backbone, Vm, layoutTemplate, SidebarView){
  var AppView = Backbone.View.extend({
    el: '.container',
    initialize: function () {
      
    },
    render: function () {
			var that = this;
      $(this.el).html(layoutTemplate);   
      var sideMenuView = Vm.create('sidebar', SidebarView);
      sideMenuView.render();
      Backbone.history.start();

		} 
	});
  return AppView;
});
