function Vehicle (centralPollution) {
    this.centralPollution = centralPollution;
}


Vehicle.prototype.getPollution = function(consumption, distance , model) {
    return (consumption * distance / 100)* this.centralPollution.getPollutionAverageByModel (model);
};

function create(centralPollution) {  
  return new Vehicle(centralPollution);
}

var exports = module.exports = {};
    exports.create = create;
