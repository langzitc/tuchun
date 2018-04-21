import Sequelize from "sequelize";
import config from "../config/db.js";
import redis from 'redis';
import fs from 'fs';
import path from 'path'
Promise.prototype.finally = function (callback) {
	let P = this.constructor;
	return this.then(
	  value  => P.resolve(callback()).then(() => value),
	  reason => P.resolve(callback()).then(() => { throw reason })
	);
};
const Connect = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});
const RedisClient = redis.createClient(config.rds_port,config.rds_host,config.rds_opts);
RedisClient.auth(config.rds_pwd,()=>{
  console.log('redis 通过认证');
})
function GetJSONFile (paths) {
  if(!fs.existsSync(paths)){
    createFolder(paths);
    fs.writeFileSync(paths, "[]");
  }
  let r = fs.readFileSync(paths).toString();
  return JSON.parse(r);
}
function createFolder (to) {
  let sep = path.sep;
  let folders = path.dirname(to).split(sep);
  let p = '';
  while (folders.length) {
      p += folders.shift() + sep;
      if (!fs.existsSync(p)) {
          fs.mkdirSync(p);
      }
  }    
}
function walk(dir,basePath = '') {  
  let children = []  
  fs.readdirSync(dir).forEach(function(filename){  
      let paths = path.resolve(dir,filename);  
      let stat = fs.statSync(paths);  
      if (stat && stat.isDirectory()) {  
           children.push({
               name: filename,
               isDirectory: true,
               children: walk(paths,"/"+filename)
           });
      }  
      else if (filename.includes('.ejs')){  
          let obj = {};
          obj.name = filename;
          obj.path = basePath ? basePath+"/"+filename : filename;
          children.push(obj);
      }  
  })  
  return children  
}  
function SaveFile (paths, data){
    if(!fs.existsSync(paths)){
        createFolder(paths);
    }   
    fs.writeFileSync(paths, data); 
}
export { Connect, RedisClient, GetJSONFile, SaveFile, createFolder, walk };