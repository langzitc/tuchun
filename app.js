import express from 'express'
import path from 'path'
import fs from 'fs'
import morgan from 'morgan'
import router from './router/index.js'
import bodyParser from 'body-parser'
import { RedisClient } from './until/index.js'
import session from 'express-session'
import http from 'http'
import socket from 'socket.io'
import SocketInit from './api/socket'
//import { SystemTask } from './task'
import './data/index.js'
Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
	  "M+": this.getMonth() + 1, //月份
	  "d+": this.getDate(), //日
	  "h+": this.getHours(), //小时
	  "m+": this.getMinutes(), //分
	  "s+": this.getSeconds(), //秒
	  "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	  "S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
const RedisStore = require('connect-redis')(session);
const app = express();
const server = require('http').Server(app);
const io = socket(server);
const sessionMiddleWare = session({
	secret: 'tuch',
	name: 'tuch_session',
    cookie: {maxAge: 1800000},  //设置maxAge是1800000ms，即30分钟后session和相应的cookie失效过期
    rolling: true,
    resave:true,
	saveUninitialized: false,
	store: new RedisStore({
		client: RedisClient,
		prefix: 'tuch_session'		
	})
});
app.use(sessionMiddleWare);
io.use((socket, next) => {
	sessionMiddleWare(socket.request, socket.request.res, next);
});
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/logger.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));
app.use("/apidoc",express.static('apidoc'));
app.use("/upload",express.static(path.join("./", 'upload')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.set('views', __dirname + '/page');
app.all('/api/:chanel/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8082");
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
app.use('/',router);
SocketInit(io);
server.listen(4000);
//SystemTask();