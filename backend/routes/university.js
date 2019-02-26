var express = require('express');
var router = express.Router();
var univ_info = require('../univ_info.json');
var dept_info = require('../dept_info.json');
var subject = require('../subject.json');

router.get('/', function(req, res, next) {
	res.send(univ_info);
});

module.exports = router;