/* maneja la comunicacion con la base de datos */

var config = require('./../config.json');
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

var MongoClient = mongodb.MongoClient;

function checkError(err, callback) {
    if (err) {
        if (callback) callback(null, err);
        //throw err;
    }
}

/**
 * Almacena el cv en base de datos
 * 
 * @param cv
 * @param callback
 */
var addCV = function addCV(cv, callback) {
    MongoClient.connect(config.db, function (err, db) {
        checkError(err, callback);

        var collection = db.collection(config.collection);

        collection.insert(
            cv
            , function (err, col) {
                checkError(err, callback);
                if (callback) callback(cv, null);
                db.close();
            });
    });
};


/*
*
* Consigue un CV en concreto
* @param id_cv
* @param callback
*/
var getCV = function getCV(id_cv, callback) {
    MongoClient.connect(config.db, function (err, db) {
        checkError(err, callback);

        var collection = db.collection(config.collection);

        var id = { "_id": ObjectID(id_cv) };
        collection.findOne(id,
            function (err, doc) {
                checkError(err, callback);
                if (callback) callback(doc, null);
                db.close();
            });
    });
}


/* 
* Modifica un CV existente
* 
* @param id_cv
* @param cv
* @param callback
*/
var modifyCV = function modifyCV(id_cv, cv, callback) {
    MongoClient.connect(config.db, function (err, db) {
        checkError(err, callback);

        var collection = db.collection(config.collection);

        if (cv._id) cv._id = ObjectID(cv._id);

        var id = { "_id": ObjectID(id_cv) };
        collection.update(
            id,
            cv
            , function (err, doc) {
                checkError(err, callback);
                if (callback) callback(doc, null);
                db.close();
            });
    });
}

/*
 * Borra un CV existente
 * 
 * @param id_cv
 * @param callback
 */
var deleteCV = function deleteCV(id_cv, callback) {
    MongoClient.connect(config.db, function (err, db) {
        checkError(err, callback);

        var collection = db.collection(config.collection);
        var id = { "_id": ObjectID(id_cv) };
        collection.remove(
            id,
            function (err, col) {
                checkError(err, callback);
                if (callback) callback(col, null);
                db.close();
            });
    });
}






/**
 * Obtiene todos los CVs,
 * especificandose o no un limite y/o saltandose
 * alguno de ellos
 * 
 * @param {Number} limit
 * @param {Number} skip
 * @param callback
 */
var getAllCVs = function getAllCVs(limit, skip, callback) {
    MongoClient.connect(config.db, function (err, db) {
        checkError(err, callback);

        var collection = db.collection(config.collection);
        //Si limit o skip es nulo, no afectara a la busqueda
        //console.log('GetAllCVs: limite:' + limit);
        //console.log('GetAllCVs: skip:' + skip);
        var cursor = collection.find({}).sort({ timestamp: -1 }).limit(limit).skip(skip);
        //console.log('GetAllCVs: cursor creado');

        cursor.toArray(function (err, cvs) {
            checkError(err, callback);
            callback(cvs, null);
            db.close();
        });
    });
};




var setup = function setup(callback) {
    // crea una capped collection para no incurrir en costes para la demo
    /*MongoClient.connect(config.db, function (err, db) {
        console.log('Conectada BD, va a crear la coleccion');
        db.createCollection(config.collection, { 'capped': true, 'size': 1024 }, function (err, collection) {
            console.log('Coleccion creada');
            db.close();
            callback();
        });
    });*/
    
    //Insert some CVs
    var cv = require ('./../../cv-api-mock/src/assets/raml/cvcreator-cvs-post-body.sample.json');
    
    addCV (cv, function (doc, err){
        if (err == null){
            console.log ('CV de prueba insertado correctamente');
            callback();
        }else {
            console.log ('Problemas con la base de datos: ');
            console.log (err.message);
            process.exit(1);
        }
    });
}

//exports
var exports = module.exports = {};
exports.addCV = addCV;
exports.getCV = getCV;
exports.modifyCV = modifyCV;
exports.deleteCV = deleteCV;
exports.getAllCVs = getAllCVs;
exports.setup = setup;