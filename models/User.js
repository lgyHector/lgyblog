var mysql = require('node-mysql-sexy-query-master');
var config = require('../config').config;
	mysql.createClient(config.db_opt);

function User(user){
	this.loginname = user.loginname;
	this.password = user.password;
	this.gender = user.gender;
	this.head = user.head;
	this.registtime = user.registtime;
	this.name = user.name;
	this.email = user.email;
	this.head_url = user.headUrl;
	this.sign = user.sign;
}

module.exports = User;

User.getUserByQuery = function (user, callback){
	mysql.use('t_user').where('loginname = ?', user.loginname)
	.where('password = ?', user.password)
	.get(function(row){
		mysql.close();
		callback(row);
	});
}

User.updateUser = function (user, callback){
	mysql.use('t_user').where('id = ?', user.id)
	.save({
		name : user.name,
		email : user.email,
		sign : user.sign,
		head_url : user.headUrl
	}, function(affectedRows){
		mysql.close();
		callback(affectedRows);
	})
}