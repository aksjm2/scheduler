var express = require('express');
var router = express.Router();
var subject = require('../subject.json');

router.get('/', function(req, res, next) {
	res.send(subject);
});

router.get('/:univ_code/:dept_code', function(req, res, next){
	var univ_code = req.params.univ_code;
	var dept_code = req.params.dept_code;

	var subjects = subject.filter(function (sub){
		return (sub.univ_code == univ_code && sub.dept_code == dept_code);
	});

	console.log(subjects);
	res.send(subjects);
});

module.exports = router;