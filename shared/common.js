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
				.then(function(data) {
					return data.length ? [data, 200] : [null, 404];
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
				.then(function(data) {
					return data.length ? [data, 200] : [null, 404];
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
				.then(function(data) {
					return data.length ? [data, 200] : [null, 404];
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
					if (hotel.length) {
						var updatedHotel = _.assign(hotel[0], attr);
						data.hotels[hotel.Name] = updatedHotel;
						return data;
					} else {
						return false;
					}		
				})
				.then(function(data) {
					return data ? [fs.writeFileAsync(db, JSON.stringify(data, null, 4)), true] : [null, false];
				})
				.spread(function(data, success) {
					return success ? 200 : 404
				})
				.catch(function(e) {
					throw e;
				});
	},
	removeHotel: function(query) {
		return fs.readFileAsync(db, 'utf-8') 
				.then(JSON.parse)
				.then(function(data) {
					var here = _.includes(_.pluck(data.hotels, 'Name'), query);
					if (here) {
						data.hotels = _.filter(data.hotels, function(hotel) {
							return _.kebabCase(hotel.Name) !== query && hotel.Name !== query;
						});
						return data;
					} else {
						return false;
					}				
				})
				.then(function(data) {
					return data ? [fs.writeFileAsync(db, JSON.stringify(data, null, 4)), true] : [null, false];
				})
				.spread(function(data, success) {
					return success ? 200 : 404
				})
				.catch(function(e) {
					throw e;
				});
	}
};