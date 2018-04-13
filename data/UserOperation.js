import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const UserOperation = Connect.define('userOperation', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  }
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: 'create_at',
  updatedAt: 'update_at',
  timestamps: true,
  tableName: `${config.dbprefix}userOperation`
});
export default UserOperation;