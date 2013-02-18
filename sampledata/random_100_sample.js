define(function () {
	var events = [];
	for(var i = 0; i < 100; i++) {
		var start = Math.floor(Math.random()*721);
		var end = Math.floor(Math.random()*(720-start)) + start;
		console.log(start, end);
		events.push({
			id: i,
			start: start,
			end: end
		})
	}
	return events;
});