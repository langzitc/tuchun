import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const Article = Connect.define('article', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  desc: {
    type: Sequelize.STRING(100)
  },
  keywords: {
    type: Sequelize.STRING(50)
  },  
  author: {
    type: Sequelize.STRING(50)
  },
  source: {
    type: Sequelize.STRING(50)
  },
  tags: {
    type: Sequelize.STRING(50)
  }, 
  flag: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
  },   
  img: {
      type: Sequelize.STRING(100)
  },
  content: {
    type: Sequelize.TEXT
  },
  hit: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: 'create_at',
  updatedAt: 'update_at',
  timestamps: true,
  tableName: `${config.dbprefix}article`
});
export default Article;