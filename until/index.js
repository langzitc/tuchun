import Sequelize from "sequelize";
import config from "../config/db.js";
import redis from 'redis';
const Connect = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});
const RedisClient = redis.createClient(config.rds_port,config.rds_host,config.rds_opts);
RedisClient.auth(config.rds_pwd,()=>{
  console.log('redis 通过认证');
})
export { Connect, RedisClient };