var mysql = require('node-mysql-sexy-query-master');
var config = require('../config').config;
	mysql.createClient(config.db_opt);

function Reply(r){
	this.content = r.content;
	this.reply_time = r.reply_time;
	this.topic_id = r.topic_id;
	this.parent_id = r.parent_id;
	this.author_id = r.author_id;
	//
	this.user = {
			id : r.user_id,
			name : r.user_name
	};
	this.child = [];
}
module.exports = Reply;

Reply.getTopicReply = function (param, callback){
	mysql.use('t_reply AS R').join('t_user AS U ON U.id = R.author_id')
	.select('R.id reply_id, R.content, R.reply_time, R.parent_id, R.topic_id, U.id user_id, U.name user_name')
	.where('R.topic_id = ?', param.topic_id)
	.get(100, function(row){
		var reply = new Reply({
			content : row.content,
			reply_time : row.reply_time,
			topic_id : row.topic_id,
			parent_id : row.parent_id,
			author_id : row.user_id,
			user_id : row.user_id,
			user_name : row.user_name
		});
		callback(row);
	});
}




























