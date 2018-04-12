import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const Talk = Connect.define('talk', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  content: {
    type: Sequelize.TEXT
  },
  aid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  uid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }  
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: true,
  updatedAt: true,
  tableName: `${config.dbprefix}talk`
});
export default Talk;