/* core de la funcionalidad de la aplicación */
var db   = require('./../database/manager');
//var uuid = require('node-uuid'); // No required, id assignment automatically

// actions
// ==============================================

var keepCV = function keepCV (cv, callback) {
	//Guardamos el curriculum en BD
	//cv.id = uuid.v4 (); //generamos el UUID
	//cv = JSON.parse (cv);
	cv.timestamp = new Date().toISOString();
	if (callback)
  		db.addCV(cv, callback);
  	else 
  		db.addCV(cv);
	/*
	//FAKE:
	console.log('El cv a guardar es: ', cv);
	callback (cv);
	*/
};

var getCV = function getCV (id_CV, callback) {
	//db.getCV (id_CV, callback);
	/*
	//FAKE:
	var result = {"name": "GetCV"};
	console.log('El cv inventado: ', result);
	callback (result);
	*/
}

var modifingCV = function modifingCV (id_CV, cv, callback) {
	//db.modifyCV (id_CV, cv,callback);
	/*
	//FAKE:
	console.log('El cv modificado es: ', cv);
	callback (cv);
	*/
}

var deleteCV = function deleteCV (id_CV, callback) {
	// ------------IMPLEMENTAR--------------
	if (callback)
		db.deleteCV (4654, callback)
  	else 
  		db.deleteCV (id_CV)
	// ------------IMPLEMENTAR--------------
	/*
	//FAKE:
	console.log('El cv se borra');
	*/
}

var getAllCVs = function getAllCVs (skip, limit, callback) { 
	db.getAllCVs (skip, limit, callback);

	// ------------IMPLEMENTAR--------------
	/*
	//FAKE:
	var result = [{"name": "getAllCVs1"},{"name": "getAllCVs2"}];
	console.log('Los cvs inventados son: ', result);
	callback (result);
	*/
	// ------------IMPLEMENTAR--------------
}

var setupEnvironment = function setupEnvironment(callback) {
	db.setup(callback);
}


//exports
var exports = module.exports = {};
	exports.keepCV     			= keepCV;
	exports.getCV      			= getCV;
	exports.modifingCV 			= modifingCV;
	exports.deleteCV   			= deleteCV;
	exports.getAllCVs  			= getAllCVs;
	exports.setupEnvironment	= setupEnvironment;