var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var router = require('./router.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api', router);

app.use(function(req, res, next) {
	res.sendStatus(400);
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.sendStatus(500);
});

app.listen(8000, function() {
	console.log('Starting server on http://localhost:8000');
});