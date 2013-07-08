var mysql = require('node-mysql-sexy-query-master');
var config = require('../config').config;
	mysql.createClient(config.db_opt);

function Topic(t){
	this.uuid = t.uuid;
	this.title = t.title;
	this.content = t.content;
	this.author_id = t.author_id;
	this.top = t.top;
	this.reply_count = t.reply_count;
	this.collect_count = t.collect_count;
	this.click_count = t.click_count;
	this.create_time = t.create_time;
	this.update_time = t.update_time;
	this.last_reply_time = t.last_reply_time;
	this.last_reply = t.last_reply;
	this.tag = t.tag;
	this.status = t.status;
}

module.exports = Topic;

Topic.prototype.save = function (t, callback){
	mysql.use('t_topic').add({
		'uuid' : this.uuid,
		'title' : this.title,
		'content' : this.content,
		'author_id' : this.author_id,
		'top' : this.top,
		'reply_count' : this.reply_count,
		'collect_count' : this.collect_count,
		'click_count' : this.click_count,
		'create_time' : this.create_time,
		'update_time' : this.update_time,
		'last_reply_time' : this.last_reply_time,
		'last_reply' : this.last_reply,
		'tag' : this.tag,
		'status' : this.status
	}, function(id){
		mysql.close();
		callback(id);
	});
}

Topic.update = function (param, callback){
	mysql.use('t_topic').where('id = ?', param.topic_id)
	.get(function(row){
		if(row){
			mysql.use('t_topic').where('id = ?', param.topic_id)
			.save({
				reply_count : row.reply_count + 1,
				last_reply_time : param.last_reply_time,
				last_reply : param.last_reply
			}, function(ef){
				mysql.close();
				callback(ef);
			})
		}
	});
}

Topic.getTopicByUUid = function (param, callback){
	mysql.use('t_topic AS T').join('t_user AS U ON T.author_id = U.id')
	.select('T.id, T.uuid uuid, T.title title, T.content content, T.top top, '+
			'T.reply_count reply_count, T.collect_count collect_count,'+
			'T.click_count click_count, T.create_time create_time,'+
			'T.update_time update_time, T.last_reply_time last_reply_time,'+
			'T.last_reply last_reply, T.tag tag, T.status status,'+
			'U.id user_id, U.loginname loginname')
	.where('T.uuid = ?', param.uuid)
	.get(function(topic){
		mysql.close();
		callback(topic);
	});
}

Topic.getAllTopics = function (param, callback){
	mysql.use('t_topic').where('status != ?', param.status)
	.order('create_time DESC')
	.page(param.pageNo, param.pageSize)
	.query(function (rows, pageInfo){
		mysql.close();
		callback(rows, pageInfo);
	});
}
/**
 * 抓取top贴
 */
Topic.getTopTopics = function (param, callback){
	mysql.use('t_topic').where('status != ?', param.status)
	.where('top = ?', param.top)
	.get(10, function(rows){
		mysql.close();
		callback(rows)
	});
}



























