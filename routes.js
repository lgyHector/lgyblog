var user = require('./controllers/User');


module.exports =  function (app){
	app.get('/', user.index);
	
	app.get('/login', user.login);
	app.post('/logon', user.logon);
	app.get('/logout', user.logout);
	app.get('/setting', user.setting);
	app.post('/doSetting', user.doSetting);
}

