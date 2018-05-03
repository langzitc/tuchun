import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const Shuoshuo = Connect.define('shuoshuo', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  is_link: {
     type: Sequelize.INTEGER,
     defaultValue: 0
  },
  img_list: {
      type: Sequelize.STRING(300)
  },
  content: {
    type: Sequelize.TEXT
  } 
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: 'create_at',
  updatedAt: 'update_at',
  timestamps: true,
  tableName: `${config.dbprefix}shuoshuo`
});
export default Shuoshuo;