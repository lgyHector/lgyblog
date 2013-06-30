var log4js = require('log4js');
	log4js.loadAppender('file');
	log4js.addAppender(log4js.appenders.file('./system.log'), 'system');
var logger = log4js.getLogger('system');//'system'
	logger.setLevel('DEBUG');
	

exports.debug = function(s){
		logger.debug(s);
	}

exports.error = function(err){
		logger.error(err);
	}



