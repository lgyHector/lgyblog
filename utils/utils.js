var generateId = require('time-uuid');

function utils(){
	
}

module.exports = utils;
/**
 * trim
 */
utils.trim = function(str){
	if(str != null){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	}
	return str;
}

/**
 * 生成token
 */
utils.generateToken = function(req){
	req.session.token = 
	return generateId();
}

