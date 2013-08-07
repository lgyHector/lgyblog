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
	this.properties = user.properties;// color : 属性 ,
	this.lastlogintime = user.lastlogintime;
	
	this.topic_count = user.topic_count;
	this.reply_count = user.reply_count;
	this.collect_topic_count = user.collect_topic_count;
	this.score = user.score;
	this.level = user.level;
	
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
		head_url : user.headUrl,
		lastlogintime : user.lastlogintime
	}, function(affectedRows){
		mysql.close();
		callback(affectedRows);
	})
}
User.regist = function (user, callback){
	mysql.use('t_user').where('loginname = ?', user.name)
	.get(function(row){
		if(row){
			mysql.close();
			callback(-1);//已存在
		}else{
			mysql.use('t_user').add({
				loginname : user.name,
				password : user.pass,
				gender : user.gender,
				name : user.name,
				email : user.email,
				registtime : user.registtime
			}, function(id){
				mysql.close();
				if(id){
					callback(id);
				}
			})
		}
	});
}