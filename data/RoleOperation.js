import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const RoleOperation = Connect.define('roleOperation', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  rid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  oid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: true,
  updatedAt: true,
  tableName: `${config.dbprefix}roleOperation`
});
export default RoleOperation;