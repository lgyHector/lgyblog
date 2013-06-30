var user = require('../controllers/User');

module.exports = function(app){
	
	app.get('/', user.index);
	app.get('/login', user.login);
	 
}