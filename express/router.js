var express = require('express');
var data = require('../shared/common.js');
var router = express.Router();

module.exports = router
	.get('/country', function(req, res) {
		data.getCountries()
			.then(function(countries) { 
				var status = countries.length ? 200 : 404;
				res.json(status, countries); 
			});
	})
	.post('/country', function(req, res) {
		data.postCountry(req.body)
			.then(function() { 
				res.sendStatus(200); 
			})
	})
	.get('/country/:country', function(req, res) {
		data.getHotels(req.params.country)
			.then(function(hotels) { 
				var status = hotels.length ? 200 : 404;
				res.json(status, hotels); 
			});
	})
	.post('/country/:country', function(req, res) {
		data.postHotel(req.params.country, req.body)
			.then(function() { 
				res.sendStatus(200); 
			});
	})
	.get('/hotel/:hotel', function(req, res) {
		data.getHotel(req.params.hotel)
			.then(function(hotel) { 
				var status = hotel.length ? 200 : 404;
				res.json(status, hotel); 
			});
	})
	.put('/hotel/:hotel', function(req, res) {
		data.updateHotel(req.params.hotel, req.body)
			.then(function() { 
				res.sendStatus(200); 
			});
	})
	.delete('/hotel/:hotel', function(req, res) {
		data.removeHotel(req.params.hotel)
			.then(function() { 
				res.sendStatus(200); 
			});
	});