var express   = require('express');
var actions   = require('./../controllers/api-actions');
var auth      = require('./../controllers/api-auth');
var router    = express.Router();

//middlewares
router.use(auth);

//--------------IMPLEMENTAR MIDDLEWARE!!--------------------

//endpoints del api

router.get  ('/cvs/:cvId',  actions.getCV);
router.put  ('/cvs/:cvId',  actions.putCV);
router.delete ('/cvs/:cvId',  actions.deleteCV);


router.get  ('/cvs',  actions.getAllCVs);
router.post ('/cvs',  actions.postCV);

//exports
module.exports = router;