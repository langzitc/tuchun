import { Connect } from "../until/index.js";
import config from '../config/db.js'
import Sequelize from "sequelize";
const Role = Connect.define('role', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  code: {
  	type: Sequelize.STRING(50),
  	allowNull: false
  }
}, 
{
  freezeTableName: false,
  createdAt: 'create_at',
  updatedAt: 'update_at',
  timestamps: true,
  tableName: `${config.dbprefix}role` 
});
export default Role;