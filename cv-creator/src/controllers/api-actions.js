/* core de la funcionalidad de la aplicación */
var db = require('./../database/manager');
var bll = require('./../bll/cvs');
var jquery = require('jquery');
var objectID = require('mongodb').ObjectID

//OJO: MIRAR COMO ESTA LA LAMADA DE BORRAR, HAY QUE MANEJAR LOS ERRORES

// actions
// ==============================================

function getResponseGeneric() {
  return {
    data: {
      currentItemCount: 0,
      items: []
    }
  };
}

function getModelError() {
  return {
    code: null,
    message: null
  };
}


function generateResponse(object, err) {
  var response = getResponseGeneric();
  if (object) {
    if (Object.prototype.toString.call(object) != '[object Array]') { //if not array
      response.data.currentItemCount = 1;
      response.data.items.push(object);
    } else { //if array
      response.data.currentItemCount = object.length;
      response.data.items = object;
    }
  }
  return response;
};

function generateResponseNotValidInParameters() {
  var response = getResponseGeneric();
  response.data = null;
  response['error'] = getModelError();
  response.error.code = 400;
  response.error.message = 'Required parameters not valid.';
  return response;
}


// obtiene todos los CVs desde el api
var getAllCVs = function getAllCVs(req, res) {
  if (validateInParametersGettAllCVs(req)) {
    var limit = req.query.limit ? Number(req.query.limit) : 10;
    var skip = req.query.skip ? Number(req.query.skip) : 0;
    bll.getAllCVs(limit, skip, function (cvs, err) {
      res.status(200);
      res.json(generateResponse(cvs, err));
      res.send();
    });
  } else {
    return res.json(generateResponseNotValidInParameters());
  }

};

function validateInParametersGettAllCVs(req) {
  return ((!req.query.limit) || (req.query.limit && !isNaN(req.query.limit))) &&
    ((!req.query.skip) || (req.query.skip && !isNaN(req.query.skip)))
}


// Guardar un nuevo CV
var postCV = function postCV(req, res) {
  if (validateInParametersPostCV(req)) {
    var cv = req.body; 
    bll.keepCV(cv, function (cv, err) {
      res.status(200);
      res.json(generateResponse(cv, err));
      res.send();
    });
  } else {
    res.json(generateResponseNotValidInParameters());
  }
};

function validateInParametersPostCV(req) {
  try {
    var str = JSON.stringify(req.body);
    JSON.parse(str);
    return str != "{}";
  } catch (ex) {
    return false;
  }
} 

//Obtener un CV
var getCV = function getCV(req, res) {
  if (validateGetCV(req)) {
    var id_cv = req.params.cvId; //Obtencion del parametro de URL: cvId
    bll.getCV(id_cv, function (cv, err) {
      res.status(200);
      res.json(generateResponse(cv, err));
      res.send();
    });
  } else {
    return res.json(generateResponseNotValidInParameters());
  }
};

function validateGetCV(req) {
  var id_cv = req.params.cvId; //Obtencion del parametro de URL: cvId
  return objectID.isValid(id_cv);
}

//Modificar un CV
var putCV = function putCV(req, res) {
  if (validatePutCV (req)){
    var cv = req.body;
    var id_cv = req.params.cvId; //Obtencion del parametro de URL: cvId
    bll.modifingCV(id_cv, cv, function (cv, err) {
      res.status(200);
      res.json(generateResponse(cv, err));
      res.send();
    });
  }else {
    return res.json(generateResponseNotValidInParameters());
  }
};

function validatePutCV(req) {
  try {
    var str = JSON.stringify(req.body);
    JSON.parse(str);
    return str != "{}" && req.body.timestamp != null;
  } catch (ex) {
    return false;
  }
}

//Borrar un CV
var deleteCV = function deleteCV(req, res) {
  if (validateDeleteCV(req)) {
    var id_cv = req.params.cvId; //Obtencion del parametro de URL: cvId
    bll.deleteCV(id_cv, function (data, err) {
      if (err) {
        res.status(generateResponse(data, err));
      } else {
        res.status(202);
      }
      res.send();
    });
  }else {
    return res.json(generateResponseNotValidInParameters());
  }
};

function validateDeleteCV(req) {
  var id_cv = req.params.cvId; //Obtencion del parametro de URL: cvId
  return objectID.isValid(id_cv);
}

//exports
var exports = module.exports = {};
exports.getAllCVs = getAllCVs;
exports.postCV = postCV;
exports.getCV = getCV;
exports.putCV = putCV;
exports.deleteCV = deleteCV;