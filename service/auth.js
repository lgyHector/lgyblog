/**
 * 需要登录
 */
exports.userRequired = function(req, res, next){
	if(!req.session.user){
		return res.redirect('/?l=logon');
	}
	next();
}
/**
 * token验证
 */
exports.tokenVerify = function(req, res, next){
	var token = req.body.token;
	var session_token = req.session.token;
	if(token){
		if(token == session_token){
			req.session.token = null;
			next();
		}else{
			return res.redirect('/error');
		}
	}else{
		next();
	}
}