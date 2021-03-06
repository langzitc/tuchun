import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const ChanelType = Connect.define('chanelType', {
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
  desc: {
    type: Sequelize.STRING(100)
  }
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  tableName: `${config.dbprefix}chanel_type`
});
export default ChanelType;