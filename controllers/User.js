var util = require('../utils/utils');
var user = require('../models/User');


exports.index = function (req, res, next){
	console.log(req.cookies.lgyCookie);
	res.render('index', {title:'Index'});
};

exports.login = function (req, res, next){
	res.render('login', {title:'Login'})
};

exports.logout = function (req, res, next){
	req.session.destroy();
	res.redirect('/login');
}

exports.logon = function (req, res, next){
	var loginname = req.body.loginname;
	var password = req.body.password;
	var message;
	if(util.trim(loginname) == '' || util.trim(password) == ''){
		message = '登录名、密码不能为空!';
		res.render('login', {message:message});
	}else{
		user.getUserByQuery({loginname:loginname, password:password}, function(row){
			if(row){
				//TODO: session中
				storeSession(row, req, res);
				res.redirect('/');
			}else{
				console.log('no user');
				res.render('login', {message:'该用户不存在'});
			}
		});
	}
};

exports.setting = function(req, res, next){
	res.render('user/setting', {message:'ok'}, function(err, html){
		if(err != null)
			res.redirect('/login');
		res.send(html);
	});
}
exports.doSetting = function(req, res, next){
	var userInfo = req.session.user;
	var param = {
			id : userInfo.id,
			name : req.body.name,
			email : req.body.email,
			headUrl : req.body.headUrl,
			sign : req.body.sign
	}
	user.updateUser(param, function(e){
		user.getUserByQuery({loginname:userInfo.loginname, password:userInfo.password}, function(row){
			req.session.user = row;
			res.redirect('/setting');
		})
	});
}


function storeSession(user, req, res){
	req.session.user = user;
	//TODO: encrypt 加密token信息
	var auth_token = user.id + '_' + user.loginname + '_' +user.password;
	res.cookie('lgyCookie', auth_token, {expires: new Date(Date.now() + 900000), httpOnly: true});
}

