var http = require('http');
var qs = require('querystring');
var data = require('../shared/common.js');

var server = http.createServer(function(req, res) {
	var url = decodeURI(req.url);

	if (/^\/api\/country$/.test(url)) {
		if (req.method === "GET") {
			data.getCountries()
				.spread(function(countries, status) { 
					res.writeHead(status, { 'Content-Type': 'application/json' });
					countries ? res.end(JSON.stringify(countries)) : res.end(); 
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
				.spread(function(hotels, status) {
					res.writeHead(status, { 'Content-Type': 'application/json' });
					hotels ? res.end(JSON.stringify(hotels)) : res.end(); 
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
				.spread(function(hotel, status) {
					res.writeHead(status, { 'Content-Type': 'application/json' });
					hotel ? res.end(JSON.stringify(hotel)) : res.end(); 
				});
		} else if (req.method === "PUT") {
			var body = '';
			req.on('data', function(str) {
				body += str;
			});
			req.on('end', function() {
				data.updateHotel(query, qs.parse(body))
					.then(function(status) { 
						res.writeHead(status);
						res.end(); 
					});
			})
		} else if (req.method === "DELETE") {
			data.removeHotel(query)
				.then(function(status) { 
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
