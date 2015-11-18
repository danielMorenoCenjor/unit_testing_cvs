var bll = require('./../bll/cvs'); //CAMBIAR!!: tiene que tirar del SDK
var fs = require('fs');

// actions
// ==============================================

// obtiene la pantalla principal del creador de CV
var getDocAPI = function getDoc(req, res) {
    var index = fs.readFileSync('views/index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
    //res.render(, { pageTitle: 'Documentation CV', layout: false });
};

//exports
var exports = module.exports = {};
exports.getDocAPI = getDocAPI;