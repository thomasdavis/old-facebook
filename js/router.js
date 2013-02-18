// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'demo/:sampledata': 'defaultRoute'
    }
  });

  var initialize = function(options){
    
    var router = new AppRouter(options);
    Backbone.router = router;

          
		router.on('route:defaultRoute', function (sampledata) {
			require(['views/demos/demo'], function (DemoPage) {
        var demoPage = Vm.create('DemoPage', DemoPage, {sampledata:sampledata});
        demoPage.render();
      });
		});
  };
  return {
    initialize: initialize
  };
});
