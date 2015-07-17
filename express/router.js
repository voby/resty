var express = require('express');
var data = require('../shared/common.js');
var router = express.Router();

module.exports = router
	.get('/country', function(req, res) {
		data.getCountries()
			.spread(function(countries, status) { 
				res.status(status);
				countries ? res.json(countries) : res.end(); 
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
			.spread(function(hotels, status) { 
				res.status(status);
				hotels ? res.json(hotels) : res.end(); 
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
			.spread(function(hotel, status) { 
				res.status(status);
				hotel ? res.json(hotel) : res.end(); 
			});
	})
	.put('/hotel/:hotel', function(req, res) {
		data.updateHotel(req.params.hotel, req.body)
			.then(function(status) { 
				res.sendStatus(status); 
			});
	})
	.delete('/hotel/:hotel', function(req, res) {
		data.removeHotel(req.params.hotel)
			.then(function(status) { 
				res.sendStatus(status); 
			});
	});