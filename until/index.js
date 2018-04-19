import Sequelize from "sequelize";
import config from "../config/db.js";
import redis from 'redis';
import fs from 'fs';
import path from 'path'
import xml2js from 'xml2js'
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
function GetXml (paths) {
  let r = fs.readFileSync(paths).toString();
  let parseString = xml2js.parseString;
  return new Promise((resolve,reject)=>{
    parseString (r,{explicitArray: false},(err,result)=>{
      if(err){
        return reject(err);
      }
      resolve(result);
    })
  });
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
async function SaveXml (paths, data){
  let jsonxml = {};
  let builder = new xml2js.Builder();
  if(fs.existsSync(paths)){
    let d = await GetXml(paths);
    data.forEach(e=>{
        let f = d.root.item.filter(e2=>{
          return e2.href === e.href;
        }).length === 0;
        if(f){
          d.root.item.push(e);
        }
    })
    jsonxml = builder.buildObject(d);
    fs.writeFileSync(paths,jsonxml);    
  }else{
    createFolder(paths);
    jsonxml = builder.buildObject({
      root: data
    });
    fs.appendFileSync(paths,jsonxml);    
  }  
}
export { Connect, RedisClient, GetXml, SaveXml, createFolder };