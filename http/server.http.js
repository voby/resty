var http = require('http');
var qs = require('querystring');
var data = require('../shared/common.js');

var server = http.createServer(function(req, res) {
	var url = decodeURI(req.url);

	if (/^\/api\/country$/.test(url)) {
		if (req.method === "GET") {
			data.getCountries()
				.then(function(countries) { 
					var status = countries.length ? 200 : 404; 
					res.writeHead(status, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(countries)); 
				});
		} else if (req.method === "POST") {
			var body = '';
			req.on('data', function(str) {
				body += str;
			});
			req.on('end', function() {
				data.postCountry(qs.parse(body))
					.then(function() { 
						res.writeHead(200);
						res.end(); 
					});
			})
		} else {
			res.writeHead(400);
			res.end();
		}
	} else if (/^\/api\/country\/[\w\-\s]+$/.test(url)) {
		var query = req.url.slice(13);
		if (req.method === "GET") {
			data.getHotels(query)
				.then(function(hotels) {
					var status = hotels.length ? 200 : 404; 
					res.writeHead(status, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(hotels)); 
				});
		} else if (req.method === "POST") {
			var body = '';
			req.on('data', function(str) {
				body += str;
			});
			req.on('end', function() {
				data.postHotel(query, qs.parse(body))
					.then(function() { 
						res.writeHead(200);
						res.end(); 
					});
			})
		} else {
			res.writeHead(400);
			res.end();
		}
	} else if (/^\/api\/hotel\/[\w\-\s]+$/.test(url)) {
		var query = url.slice(11);
		if (req.method === "GET") {
			data.getHotel(query)
				.then(function(hotel) {
					var status = hotel.length ? 200 : 404; 
					res.writeHead(status, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(hotel)); 
				});
		} else if (req.method === "PUT") {
			var body = '';
			req.on('data', function(str) {
				body += str;
			});
			req.on('end', function() {
				data.updateHotel(query, qs.parse(body))
					.then(function(success) { 
						var status = success ? 200 : 404; 
						res.writeHead(status);
						res.end(); 
					});
			})
		} else if (req.method === "DELETE") {
			data.removeHotel(query)
				.then(function() { 
					var status = success ? 200 : 404; 
					res.writeHead(status);
					res.end(); 
				});
		} else {
			res.writeHead(400);
			res.end();
		}
	} else if (req.url) {
		res.writeHead(404);
		res.end();
	} else {
		res.writeHead(500);
		res.end();
	}
});

server.listen(8000, function() {
	console.log('Starting server on http://localhost:8000');
});
