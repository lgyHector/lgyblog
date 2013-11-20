var user = require('./controllers/User');
var topic = require('./controllers/topic');
var reply = require('./controllers/reply');
var auth = require('./service/auth');


module.exports =  function (app){
	app.get('/', topic.index);
	
	/**登录**/
	app.get('/login', user.login);
	app.post('/logon', user.logon);
	app.get('/logout', user.logout);
	app.get('/setting', auth.userRequired, user.setting);
	app.post('/doSetting', auth.userRequired, user.doSetting);
	app.get('/regist', user.regist);
	app.post('/doRegist', user.doRegist);
	
	/**发帖**/
	app.get('/topic/newTopic', auth.userRequired, topic.newTopic);
	app.post('/topic/releaseTopic', auth.userRequired, topic.releaseTopic);
	app.post('/topic/reply', reply.reply);
	app.get('/topic/:uuid', topic.getTopicByUUid);
	
	/**系统**/
	app.get('/error', user.error);
}

