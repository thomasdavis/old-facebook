require.config({
  paths: {
    jquery: '../js/libs/jquery/jquery-min',
    underscore: '../js/libs/underscore/underscore-min',
    daybox: '../js/libs/daybox/daybox'
  }

});


require(['daybox', 'daybox_test'], function(){
    (function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var htmlReporter = new jasmine.HtmlReporter();

      jasmineEnv.addReporter(htmlReporter);

      jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };

      var currentWindowOnload = window.onload;

      window.onload = function() {
        if (currentWindowOnload) {
          currentWindowOnload();
        }
        execJasmine();
      };

      function execJasmine() {
        jasmineEnv.execute();
      }

    })();
});
