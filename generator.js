var fs = require('fs');
var casual = require('casual');
var Factory = require('rosie').Factory;
var _ = require('lodash');

db = {};

db.countries = [];
db.hotels = [];

Factory.define('Countries')
	.sequence('Name', function() {return casual.country})
	.attr('Description', function() {return casual.description});


Factory.define('Hotels')
	.sequence('Name', function() {return casual.title})
	.attr('Rooms', function() {return casual.integer(50, 1000)})
	.attr('Stars', function() {return casual.integer(1, 5)});

_.times(20, function() {
	var country = Factory.build('Countries');
	db.countries.push(country);

	_.times(10, function() {
		var hotel = Factory.build('Hotels', {Country: country.Name});
		db.hotels.push(hotel);
	});
});

fs.writeFile('data.json', JSON.stringify(db, null, 4), function(err) {
	if (err) throw err;

	console.log('Done!');
});
