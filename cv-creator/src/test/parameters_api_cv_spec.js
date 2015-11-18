var CV_JSON_EXAMPLE =
    {
        "name": 'TDD',
        "surname": "Romero",
        "location": {
            "country": "Espana",
            "city": "Madrid"
        },
        "contact": {
            "phone": "6325878745",
            "email": "aromero@solusoft.es"
        },
        "studies": {
            "highSchool": "",
            "college": {
                "title": "Grado en Ingenieria de Energia",
                "university": "Autonoma",
                "rate": 3
            }
        }
    };


var CV_JSON_EXAMPLE_MODIFIED =
    {
        "name": 'TDD',
        "surname": "Romero",
        "location": {
            "country": "Espana",
            "city": "Madrid"
        },
        "contact": {
            "phone": "6325878745",
            "email": "aromero@solusoft.es"
        },
        "studies": {
            "highSchool": "",
            "college": {
                "title": "Grado en Ingenieria de Energia",
                "university": "Autonoma",
                "rate": 3
            }
        },
        "timestamp": "2015-09-11T08:07:08.431Z"
    };
    
    
var RESPONSE_CV_MODIFIED =
    {
        data: {
            currentItemCount: 1,
            items: [
                {
                    ok: 1,
                    nModified: 1,
                    n: 1
                }
            ]
        }
    };



var ERROR_RESPONSE_PARAMETERS_IN =
    {
        data: null,
        error: {
            code: 400,
            message: "Required parameters not valid."
        }
    };

var RESPONSE_NOT_FOUND =
    {
        data: {
            currentItemCount: 0,
            items: []
        }
    }


var ID_CV_VALID = "55ee9020ce1c08a414e6f019";
var ID_CV_NOT_EXIST = "55f683b8bbfa9510203cfd58";
var ID_CV_NOT_VALID = "00000000000000000000";    
var ID_CV_FOR_DELETE1 = "55f7c654296f6d6826667b58";
var ID_CV_DELETED = "55f7c5b098574b1026e4f79f";

//exports
var exports = module.exports = {};
exports.CV_JSON_EXAMPLE = CV_JSON_EXAMPLE;
exports.CV_JSON_EXAMPLE_MODIFIED = CV_JSON_EXAMPLE_MODIFIED;
exports.RESPONSE_CV_MODIFIED = RESPONSE_CV_MODIFIED;
exports.ERROR_RESPONSE_PARAMETERS_IN = ERROR_RESPONSE_PARAMETERS_IN;
exports.ERROR_RESPONSE_NOT_FOUND = RESPONSE_NOT_FOUND;
exports.ID_CV_VALID = ID_CV_VALID;
exports.ID_CV_NOT_VALID = ID_CV_NOT_VALID;
exports.ID_CV_NOT_EXIST = ID_CV_NOT_EXIST;
exports.ID_CV_FOR_DELETE1 = ID_CV_FOR_DELETE1;
exports.ID_CV_DELETED = ID_CV_DELETED;
    