var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');

var db = path.resolve('data.json');

Promise.promisifyAll(fs);

module.exports = {
	getCountries: function() {
		return fs.readFileAsync(db, 'utf-8')
				.then(JSON.parse)
				.then(function(data) {
					return data.countries;
				})
				.catch(function(e) {
					throw e;
				});
	},
	postCountry: function(country) {
		return fs.readFileAsync(db, 'utf-8')
				.then(JSON.parse)
				.then(function(data) {
					data.countries.push(country);
					return data;
				})
				.then(function(data) {
					return fs.writeFileAsync(db, JSON.stringify(data, null, 4));
				})	
				.catch(function(e) {
					throw e;
				});
	},
	getHotels: function(query) {
		return fs.readFileAsync(db, 'utf-8')
				.then(JSON.parse)
				.then(function(data) {
					return _.filter(data.hotels, function(hotel) {
						return _.kebabCase(hotel.Country) === query || hotel.Country === query;
					});
				})
				.catch(function(e) {
					throw e;
				});
	},
	postHotel: function(country, attr) {
		return fs.readFileAsync(db, 'utf-8')
				.then(JSON.parse)
				.then(function(data) {
					var hotel = _.assign({Country: country}, attr);
					data.hotels.push(hotel);
					return data;
				})
				.then(function(data) {
					return fs.writeFileAsync(db, JSON.stringify(data, null, 4));
				})	
				.catch(function(e) {
					throw e;
				});
	},
	getHotel: function(query) {
		return fs.readFileAsync(db, 'utf-8')
				.then(JSON.parse)
				.then(function(data) {
					return _.filter(data.hotels, function(hotel) {
						return _.kebabCase(hotel.Name) === query || hotel.Name === query;
					});
				})
				.catch(function(e) {
					throw e;
				});
	},
	updateHotel: function(query, attr) {
		return fs.readFileAsync(db, 'utf-8')
				.then(JSON.parse)
				.then(function(data) {
					var hotel = _.filter(data.hotels, function(hotel) {
						return _.kebabCase(hotel.Name) === query || hotel.Name === query;
					});
					var updatedHotel = _.assign(hotel[0], attr);
					data.hotels[hotel.Name] = updatedHotel;
					return data;
				})
				.then(function(data) {
					return fs.writeFileAsync(db, JSON.stringify(data, null, 4));
				})
				.catch(function(e) {
					throw e;
				});
	},
	removeHotel: function(query) {
		return fs.readFileAsync(db, 'utf-8') 
				.then(JSON.parse)
				.then(function(data) {
					data.hotels = _.filter(data.hotels, function(hotel) {
						return _.kebabCase(hotel.Name) !== query && hotel.Name !== query;
					});
					return data;
				})
				.then(function(data) {
					return fs.writeFileAsync(db, JSON.stringify(data, null, 4));
				})
				.catch(function(e) {
					throw e;
				});
	}
};