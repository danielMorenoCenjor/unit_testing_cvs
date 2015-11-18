/* SDK de acceso al api de CV */
var unirest = require('unirest');
var config = require('./../config.json');
var exports = module.exports = {};

//El sdk tambien tendria que tener su validacion!!

/**
* Keep a CV in a persistent storage
**/
exports.addCV = function addCV(cv, callback) {
	var Request = unirest.post((config.host.concat (config.port)).concat (config.api_route))
		.header('Authorization', config.apikey)
		.header('Content-Type', 'application/json')
		.send(cv)
		.end(function (response) {
			callback(response.body);
		});
}

/**
 * Get all CVs with parameters given
 * @param {Number} limit
 * @param {Number} skip
 * @param callback
 */
exports.getAllCV = function getAllCV(limitCVs, skipsCVs, callback) {
	var Request = unirest.get((config.host.concat (config.port)).concat (config.api_route))
		.header('Authorization', config.apikey)
		.query('skip=' + skipsCVs)
		.query('limit=' + limitCVs)
		.end(function (response) {
			callback(response.body);
		});
}

/**
 * Get CV
 * @param {Number_unique} limit
 * @param callback
 */
exports.getCV = function getCV(id_cv, callback) {
	var Request = unirest.get(((config.host.concat (config.port)).concat (config.api_route)).concat (id_cv))
		.header('Authorization', config.apikey)
		.end(function (response) {
			callback(response.body);
		});
}

/**
 * Modify CV
 * @param {Number} id_cv
 * @param {Object} cv 
 * @param callback
 */
exports.modifyCV = function modifyCV(id_cv, cv, callback) {
	var Request = unirest.put(((config.host.concat (config.port)).concat (config.api_route)).concat(id_cv))
		.header('Authorization', config.apikey)
		.header('Content-Type', 'application/json')
		.send(cv)
		.end(function (response) {
			callback(response.body);
		});
}

/**
 * Delete CV
 * @param {Number} id_cv
 */
exports.deleteCV = function deleteCV(id_cv, callback) {
	var Request = unirest.delete(((config.host.concat (config.port)).concat (config.api_route)).concat(id_cv))
		.header('Authorization', config.apikey)
		.end(function (response) {
			callback(response);
		});
}