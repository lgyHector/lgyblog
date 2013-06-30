var database = {
	"mysql-5.1" : [ {
		"name" : "lgy",
		"label" : "mysql-5.1",
		"plan" : "free",
		"tags" : [ "mysql", "mysql-5.1", "relational", "mysql-5.1", "mysql" ],
		"credentials" : {
			"name" : "d6939725959874f539be37f281625551d",
			"hostname" : "us01-user01.crtks9njytxu.us-east-1.rds.amazonaws.com",
			"host" : "us01-user01.crtks9njytxu.us-east-1.rds.amazonaws.com",
			"port" : 3306,
			"user" : "u09lnrZRAmBDe",
			"username" : "u09lnrZRAmBDe",
			"password" : "pPFlNo8gWlLLy"
		}
	} ]
}
exports.config = {
		//数据库
		db_opt : {
			/*host : 'localhost',
			user : 'root',
			password : 'sqs',
			database : 'lgy'*/
			host : database['mysql-5.1'][0]['credentials']['hostname'],
			user : database['mysql-5.1'][0]['credentials']['user'],
			password : database['mysql-5.1'][0]['credentials']['password'],
			database : database['mysql-5.1'][0]['credentials']['name']
		}
		
};