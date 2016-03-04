/*
Especificacion del test para el API
de CV

Depuracion con mocha:

	mocha --debug-brk

En el Visual Code, te vas a Debug y le das al play con
la configuracion del attach

history: 
    DMC 04032016 Modifica
*/

var expect = require("chai").expect;
var testApi = require("./../lib/api_test.js");
var assert = require('assert');
var param = require("./parameters_api_cv_spec.js");
var config = require('./../config.json');

var port = process.env.PORT || config.port;
    config.port = port;

describe("Test API CV", function () {

    

    describe("#postCV()", function () {

        it("Should reject null cv", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.postCV(null, function (result) {
                    expect(result).to.deep.equal(param.ERROR_RESPONSE_PARAMETERS_IN);
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });

        it("Should reject empty cv", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.postCV({}, function (result) {
                    expect(result).to.deep.equal(param.ERROR_RESPONSE_PARAMETERS_IN);
                    done();
                });

            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        }); 

        it("Should keep CV in DB", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.postCV(param.CV_JSON_EXAMPLE, function (result) {
                    expect(result).not.to.be.null;
                    expect(result.data.items.length).to.eql(1);
                    expect(result.data.items[0]).to.have.a.property('_id');
                    expect(result.data.items[0]).to.have.a.property('timestamp');
                    param.ID_CV_VALID = result.data.items[0]._id;
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });
    });

    describe("#getCVs()", function () {
        it("Should get 1 CV (the first)", function (done) {
            assert.doesNotThrow(function () {
                testApi.getCVs(1, 0, function (result) {
                    expect(result.data).to.not.be.null;
                    expect(result).to.not.have.property('error');
                    expect(result.data.items.length).to.eql(1); //Return 1 Cvs
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });

        it("Should get some CVs", function (done) {
            assert.doesNotThrow(function () {
                testApi.getCVs(5, 0, function (result) {
                    //console.dir(result);
                    expect(result.data).to.not.be.null;
                    expect(result).to.not.have.property('error');
                    expect(result.data.items.length).to.satisfy(function (num) { return num > 1; }); //Return >1 Cvs  
                    done();
                }, function (err) {
                    if (err) throw err; // will fail the assert.doesNotThrow
                    done(); // call "done()" the parameter
                });
            });
        });
    });

    describe("#getCV()", function () {

        it("Should get an error, id is empty", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.getCV("", function (result) {
                    expect(result).to.not.have.property('error');
                    expect(result.data.items.length).to.satisfy(function (num) { return num > 1; }); //Return >1 Cvs  
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });

        });

        it("Should get an error, id not exist", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.getCV(param.ID_CV_NOT_EXIST, function (result) {
                    expect(result).not.to.be.null;
                    expect(result).to.deep.equal(param.ERROR_RESPONSE_NOT_FOUND);
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });

        it("Should get the CV", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.getCV(param.ID_CV_VALID, function (result) {
                    expect(result).not.to.be.null;
                    expect(result.data.items[0]).to.have.a.property('_id');
                    expect(result).to.not.have.property('error');
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });



        it("Should get an error, id not valid", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.getCV(param.ID_CV_NOT_VALID, function (result) {
                    expect(result).not.to.be.null;
                    expect(result).to.deep.equal(param.ERROR_RESPONSE_PARAMETERS_IN);
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });

        it("Should get an error, id is null", function (done) {
            assert.doesNotThrow(function () {
                var result = testApi.getCV(null, function (result) {
                    expect(result).not.to.be.null;
                    expect(result).to.deep.equal(param.ERROR_RESPONSE_PARAMETERS_IN);
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });

    });

    describe("#putCV()", function () {

        it("Should modified CV", function (done) {
            assert.doesNotThrow(function () {
                var cv = param.CV_JSON_EXAMPLE_MODIFIED;
                cv.name = cv.name.concat(" Modified");
                var result = testApi.putCV(param.ID_CV_VALID, cv, function (result) {
                    expect(result).not.to.be.null;
                    //expect(result.data.items[0]).to.have.a.property('_id');
                    //expect(result.data.items[0].name).to.eql(cv.name);
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });

        it("Should modified CV even though _id is in the modification", function (done) {
            assert.doesNotThrow(function () {
                var cv = param.CV_JSON_EXAMPLE_MODIFIED;
                cv.name = cv.name.concat(" 2 Modified");
                cv["_id"] = param.ID_CV_VALID;
                var result = testApi.putCV(param.ID_CV_VALID, cv, function (result) {
                    expect(result).not.to.be.null;
                    //expect(result.data.items[0]).to.have.a.property('_id');
                    //expect(result.data.items[0].name).to.eql(cv.name);
                    //expect(result).to.deep.equal(param.RESPONSE_CV_MODIFIED);
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });

        it("Should NOT modified CV if not timestamp ", function (done) {
            assert.doesNotThrow(function () {
                var cv = param.CV_JSON_EXAMPLE_MODIFIED;
                delete cv.timestamp;
                var result = testApi.putCV(param.ID_CV_VALID, cv, function (result) {
                    expect(result.data).to.be.null;
                    expect(result).to.deep.equal(param.ERROR_RESPONSE_PARAMETERS_IN);
                    done();
                });

            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
        });
    });

    describe("#deleteCV()", function () {
        
        it("Should be delete CV", function (done) {
            assert.doesNotThrow(function () {
                var deleted = testApi.deleteCV(param.ID_CV_FOR_DELETE1, function (deleted){
                    expect(deleted).to.eql(true);
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
            
        });
        
        it("Should NOT be delete CV, because the ID no exist", function (done) {
            assert.doesNotThrow(function () {
                var deleted = testApi.deleteCV(param.ID_CV_DELETED, function (deleted){
                    expect(deleted).to.eql(true); //Si todo ha ido biensera aceptada y mas tarde procesada
                    done();
                });
            }, function (err) {
                if (err) throw err; // will fail the assert.doesNotThrow
                done(); // call "done()" the parameter
            });
            
        });
    });

});
