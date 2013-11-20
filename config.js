//var database = JSON.parse(process.env.VCAP_SERVICES);
//var sitehost = process.env.SITE_HOST;
exports.config = {
		//数据库
		db_opt : {
			host : 'localhost',
			user : 'root',
			password : 'sqs',
			database : 'lgy'
			/*host : database['mysql-5.1'][0]['credentials']['hostname'],
			user : database['mysql-5.1'][0]['credentials']['user'],
			password : database['mysql-5.1'][0]['credentials']['password'],
			database : database['mysql-5.1'][0]['credentials']['name']*/
		},
		//地址
		site_host : 'http://localhost:8888',
		//site_host : sitehost,
		site_port : '8888'
		
};