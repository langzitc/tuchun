import path from 'path'
export default {
	database: "tuchun",
	host: "112.74.173.73",
    dialect: "mysql",
    dbprefix: "tuch_",
	pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	},	
	username: "tuchun",
	password: "JmK5zxneZk",
	rds_port: 6379,
	rds_host: '112.74.173.73',
	rds_pwd: 'JmK5zxneZk',
	rds_opts: {},
	static_server_url: 'http://static.54tuchun.com',
	qn_config: {
		bucket: 'tuchstyle',
		accessKey: 'QfIgZFhFFAoW466YeHKQFOfudBqbdp9J9wmXlKRn',
		secretKey: 'kTVNeCVT3NKTFDkDY2R4D0vJQICCABdAhGpMFRqR'
	}
}