import express from 'express'
import path from 'path'
import router from './router/index.js'
import bodyParser from 'body-parser'
import session from 'express-session'
// import './data/index.js'
const app = express();
app.use(session({
    secret: 'tuch',
    cookie: {maxAge: 1800000},  //设置maxAge是1800000ms，即30分钟后session和相应的cookie失效过期
    rolling: true,
    resave:true,
    saveUninitialized: false
}));
app.use("/apidoc",express.static('apidoc'));
app.use("/upload",express.static(path.join("../", 'upload')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.set('views', __dirname + '/page');
app.all('/api', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
app.use('/',router);
app.listen(4000);