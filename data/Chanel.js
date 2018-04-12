import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const Chanel = Connect.define('chanel', {
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
  chanel_template: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  list_template: {
    type: Sequelize.STRING(100),
  },
  art_template: {
    type: Sequelize.STRING(100),
  },
  flag: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1   
  },
  chanel_type: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
  },
  title: {
    type: Sequelize.STRING(100),
  },
  desc: {
    type: Sequelize.STRING(100),
  },
  keywords: {
    type: Sequelize.STRING(100),
  },
  img: {
      type: Sequelize.STRING(100)
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
  tableName: `${config.dbprefix}chanel`
});
export default Chanel;