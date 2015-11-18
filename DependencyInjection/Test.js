//https://blog.risingstack.com/dependency-injection-in-node-js/

var Vehicle = require('./Vehicle.js');



var fakePollution = {
    getPollutionAverageByModel: function (model) {
        if (model === 'Volkswagen') {
            return 1;
        }
    }

}
//var vehicle = Vehicle.create (require('./CentralPollution.js'));
var vehicle = Vehicle.create(fakePollution);

console.log(vehicle.getPollution(7.5, 2000, 'Volkswagen'));

/*End test*/
