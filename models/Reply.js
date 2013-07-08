var mysql = require('node-mysql-sexy-query-master');
var config = require('../config').config;
	mysql.createClient(config.db_opt);

function Reply(r){
	this.reply_id = r.reply_id;
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

Reply.prototype.save = function (params, callback){
	mysql.use('t_reply').add({
		'id' : this.reply_id,
		'content' : this.content,
		'reply_time' : this.reply_time,
		'topic_id' : this.topic_id,
		'parent_id' : this.parent_id,
		'author_id' : this.author_id
	}, function(id){
		mysql.close();
		if(id){
			callback(id);
		}
	});
}

Reply.getTopicReply = function (param, callback){
	mysql.use('t_reply AS R').join('t_user AS U ON U.id = R.author_id')
	.join('t_topic AS T ON T.id = R.topic_id')
	.select('R.id reply_id, R.content, R.reply_time, R.parent_id, R.topic_id, U.id user_id, U.name user_name')
	.where('T.uuid = ?', param.uuid)
	.get(100, function(rows){
		var haspids = new Object();
		var nopids = new Object();
		for(var i=0;i<rows.length;i++){
			var reply = new Reply({
				reply_id : rows[i].reply_id,
				content : rows[i].content.replace(/\r\n/g, '\n'),//这个梗很无语啊...
				reply_time : rows[i].reply_time,
				topic_id : rows[i].topic_id,
				parent_id : rows[i].parent_id,
				author_id : rows[i].user_id,
				user_id : rows[i].user_id,
				user_name : rows[i].user_name
			});
			if(reply.parent_id){
				haspids[reply.reply_id] = reply;
			}else{
				nopids[reply.reply_id] = reply;
			}
		}
		for(var h in haspids){
			nopids[haspids[h].parent_id].child.push(haspids[h]);
		}
		mysql.close();
		callback(nopids);
	});
}




























