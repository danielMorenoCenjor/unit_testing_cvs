
var actions = require('./../sdk_api_cv/sdk_cv_operations.js');
var exports = module.exports = {};


exports.getCVs = function (limitCVs, skipsCVs, callback) {
	actions.getAllCV (limitCVs, skipsCVs, callback);
};

exports.postCV = function (cv, callback) {
	actions.addCV (cv, callback);
};

exports.getCV = function (id_cv, callback) {
	actions.getCV (id_cv, callback);
};

exports.putCV = function (id_cv, cv, callback) {
	actions.modifyCV (id_cv, cv, callback);
};


exports.deleteCV = function (id_cv, callback) {
	actions.deleteCV (id_cv, function(response){
		(response.statusCode == 202 ) ? callback (true) : callback (false);
	});
};

