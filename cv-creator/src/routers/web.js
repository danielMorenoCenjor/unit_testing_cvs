var express   = require('express');
var actions   = require('./../controllers/web-actions');
var router    = express.Router();

//endpoints de la web
router.get  ('/',  actions.getDocAPI);


//exports
module.exports = router;