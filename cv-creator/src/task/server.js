
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./../config.json');
var app = express();
var server = require('http').createServer(app);
var bll = require('./../bll/cvs');

var spawn = require('child_process').spawn,
	path = require('path'),
	start = function (grunt) {
		// routers
		// ==============================================
		var api = require('./routers/api');
		var web = require('./routers/web');

		// configuramos la aplicacion 
		// ==============================================
		app.use(bodyParser.urlencoded({ extended: true }));   //nos permite obtener urlencode data desde body
		app.use(bodyParser.json());                           //nos permite obtener json data desde body


		// rutas
		// ==============================================
		app.use('/api', api);
		app.use('/', web);

		// servidor
		// ==============================================
		var port = process.env.PORT || config.port;

		server.listen(port, function () {
			bll.setupEnvironment(function () {
				console.log('Servidor preparado en http://localhost:%s', server.address().port);
			});
		});
		return server;
	};

module.exports = start;