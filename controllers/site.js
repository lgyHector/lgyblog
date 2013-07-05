var util = require('../utils/utils');

exports.to404 = function(req, res, next){
	res.render('404', {message:'404'});
}