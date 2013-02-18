define(['daybox'], function(Daybox){

  describe("Daybox", function() {
    var player;
    var song;

    beforeEach(function() {

    });

    it("passing a empty events object should generate an empty events object", function() {
      var daybox = new Daybox({events: []});
      expect(daybox.events.length).toEqual(0);
    });
    it("a specified events array should generate an events array of equal length", function() {
      var daybox = new Daybox({events: [
        {id: 0, start: 0, end: 10},
        {id: 1, start: 20, end: 30}
      ]});
      expect(daybox.events.length).toEqual(2);
    });
    it("should generate valid values for positioning", function () {
      var daybox = new Daybox({events: [
        {id: 0, start: 0, end: 10},
        {id: 1, start: 20, end: 30}
      ]});
      expect(daybox.events).toEqual([
        {id: 0, start: 0, end: 10, top: 0, left: 0, width: 600},
        {id: 1, start: 20, end: 30, top: 20, left: 0, width: 600}
      ]);

    });
    it("a generated events object should contain only the required properties", function() {
      var requiredProperties = [
        'start',
        'end',
        'id',
        'top',
        'left',
        'width'
      ];
      var daybox = new Daybox({events: [
        {id: 0, start: 0, end: 10},
        {id: 1, start: 20, end: 30}
      ]});
      for(property in daybox.events[0]) {
        expect(requiredProperties.indexOf(property)).not.toEqual(-1);
      }
    });
    it("should handle large data sets", function () {
      var events = [];
      for(var i = 0; i < 619; i++) {
        events.push({
          id: i,
          start: i,
          end: i
        });
      };
      var daybox = new Daybox({events: events});
      expect(daybox.events.length).toEqual(619);

    });
    it("should handle nesting events side by side", function () {
      var daybox = new Daybox({events: [
        {id: 0, start: 0, end: 100},
        {id: 1, start: 50, end: 150}
      ]});
      expect(daybox.events).toEqual([
        {id: 0, start: 0, end: 100, top: 0, left: 0, width: 300},
        {id: 1, start: 50, end: 150, top: 50, left: 300, width: 300}
      ]);

    });
  });
});