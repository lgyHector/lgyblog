var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , ejs = require('ejs')
  , Logger = require('./models/Logger');

var app = express();

app.configure(function(){
	app.set('port', 8888);
	app.set('views', __dirname + '/views');
	app.engine('.html', ejs.__express);
	app.set('view engine', 'html');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser()); 
	app.use(express.session({ secret : 'lgySession', cookie:{maxAge:600000}}));//session过期时间1小时
	app.use(express.static(__dirname + '/public/js'));
	app.use(express.static(__dirname + '/public/css'));
	app.use(express.static(__dirname + '/public/img'));
	app.use(function(req, res, next){
		res.locals.user = req.session.user;
		res.locals.message = '';
		next();
	});
});

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

routes(app);

exports.start = function(){
	http.createServer(app).listen(app.get('port'), function(){
		console.log("blabla启动...");
	});
}

