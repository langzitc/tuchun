import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const UserInfo = Connect.define('userInfo', {
  uid: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	primaryKey: true,
  	allowNull: false
  },
  birthday: {
    type: Sequelize.STRING(50)
  },
  caprivince: {
    type: Sequelize.STRING(20)
  },
  cacity: {
    type: Sequelize.STRING(20)
  },
  cadist: {
    type: Sequelize.STRING(20)
  },
  cainfo: {
    type: Sequelize.STRING(50)
  }, 
  oaprivince: {
    type: Sequelize.STRING(20)
  },
  oacity: {
    type: Sequelize.STRING(20)
  },
  oadist: {
    type: Sequelize.STRING(20)
  },
  oainfo: {
    type: Sequelize.STRING(50)
  },        
  zhiye: {
  	type: Sequelize.STRING(20)
  },
  company: {
  	type: Sequelize.STRING(50),
  },
  xingqu: {
  	type: Sequelize.STRING(100)
  },
  qianming: {
  	type: Sequelize.STRING(100)
  },
  desc: {
  	type: Sequelize.STRING(100)
  },
  homepage: {
  	type: Sequelize.STRING(100),
  },
  tags: {
    type: Sequelize.STRING(100),
  }  
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: true,
  updatedAt: true,
  tableName: `${config.dbprefix}user_info`
});
export default UserInfo;