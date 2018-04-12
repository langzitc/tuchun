import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const Classification = Connect.define('classification', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  name: {
    type: Sequelize.STRING(50)
  },
  pid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: true,
  updatedAt: true,
  tableName: `${config.dbprefix}classification`
});
export default Classification;