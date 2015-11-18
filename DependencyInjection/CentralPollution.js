
var getPollutionAverageByModel = function getPollutionAverageByModel (model) {
	if (model === 'Volkswagen'){
		return 0.7;
	}
}


//exports
var exports = module.exports = {};
	exports.getPollutionAverageByModel = getPollutionAverageByModel;