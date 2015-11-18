
var centralPollution = require ('./CentralPollution.js');


var getPollution = function(consumption, distance , model) {
    return (consumption * distance / 100)*centralPollution.getPollutionAverageByModel (model);
};

//exports
var exports = module.exports = {};
	exports.getPollution = getPollution;
