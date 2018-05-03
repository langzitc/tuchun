import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const Picture = Connect.define('picture', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  url: {
      type: Sequelize.STRING(200),
      allowNull: false
  },
  title: {
      type: Sequelize.STRING(100)
  },
  desc: {
      type: Sequelize.STRING(200)
  },
  showType: {
      type: Sequelize.INTEGER,
      defaultValue: 0
  }
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: 'create_at',
  updatedAt: 'update_at',
  timestamps: true,
  tableName: `${config.dbprefix}picture`
});
export default Picture;