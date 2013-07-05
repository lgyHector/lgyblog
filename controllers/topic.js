var util = require('../utils/utils');
var Topic = require('../models/Topic');
var dateformat = require('dateformat');
var generateId = require('time-uuid');
var Pager =require('../models/Pager');
var Reply = require('../models/Reply');

exports.index = function (req, res, next){
	var pageNo = 1;
	if(req.query.page)
		pageNo = req.query.page;
	Reply.getTopicReply({topic_id:1}, function(rs){
		console.log(rs);
	});
	/*Topic.getAllTopics({status:'DEL', pageNo:pageNo, pageSize:2}, function(rows, pageInfo){
		res.render('index', {
			title : '卧槽~', 
			topics : rows, 
			dateformat : dateformat, 
			page : Pager.getPager(pageInfo),
			url : Pager.generateUrl(req)
		});
	});*/
};

exports.getTopicByUUid = function (req, res, next){
	var uuid = req.params.uuid;
	Topic.getTopicByUUid({uuid:uuid}, function (row){
		res.render('topic/topic', {topic:row, dateformat:dateformat}, function(err, html){
			if(null != err)
				res.render('404', {message:err});
			else
				res.send(html);
		});
	})
};

exports.newTopic = function (req, res, next){
	res.render('topic/new_topic', {message:'ok'}, function (err, html){
		if(err != null){
			res.render('404', {message:err});
		}else{
			res.send(html);
		}
	});
}

exports.releaseTopic = function (req, res, next){
	var author = req.session.user;
	var t = {
		uuid : generateId(),
		title : req.body.title,
		content : req.body.content,
		tag : req.body.tag,
		author_id : author.id,
		top : false,
		reply_count : 0,
		collect_count : 0,
		click_count : 0,
		create_time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
		status : 'RE'
	}
	var topic = new Topic(t);
	topic.save(null, function (id){
		if(id){
			res.redirect('/');
		}else{
			res.render('404', {message:'shit'});
		}
	});
}
