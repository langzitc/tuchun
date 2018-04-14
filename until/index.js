import Sequelize from "sequelize";
import config from "../config/db.js";
import redis from 'redis';
import fs from 'fs';
import xml2js from 'xml2js'
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
    parseString (r,(err,result)=>{
      if(err){
        return reject(err);
      }
      resolve(result);
    })
  });
}
export { Connect, RedisClient, GetXml };