//http://stackoverflow.com/questions/9250851/do-i-need-dependency-injection-in-nodejs-or-how-to-deal-with


var Vehicle = require('./Vehicle.js');




var vehicle = Vehicle.create (require('./CentralPollution.js'));


console.log(vehicle.getPollution(7.5, 2000, 'Volkswagen'));

/*End test*/




