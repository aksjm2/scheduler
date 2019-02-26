var express = require('express');
var router = express.Router();
var dept_info = require('../dept_info.json');
var subject = require('../subject.json');

router.get('/', function(req, res, next) {
	res.send(dept_info);
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var dept = dept_info.filter(function (dept){
		return dept.univ_code === id;
	});
	res.send(dept);
});

module.exports = router;