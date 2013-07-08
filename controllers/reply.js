var Reply = require('../models/Reply');
var Topic = require('../models/Topic');
var dateformat = require('dateformat');

exports.reply = function (req, res, next){
	var topic_id = req.body.topic_id;
	var topic_uuid = req.body.topic_uuid;
	var author = req.session.user;
	console.log(req.body.content);
	var r = new Reply({
		content : req.body.content,
		reply_time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
		topic_id : topic_id,
		author_id : author.id
	});
	r.save(null, function(id){
		console.log(r);
	});//此处异步后果
	
	Topic.update({
		topic_id : topic_id,
		reply_count : 1,
		click_count : 1,
		last_reply_time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
		last_reply : r.content
		}, function(ef){
			if(ef){
				res.redirect('/topic/'+topic_uuid);
			}else{
				res.render('404', {message:'Fail!'});
			}
	});
}

