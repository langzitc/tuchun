import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const Web = Connect.define('web', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  template_path: {
    type: Sequelize.STRING(100)
  },
  upload_path: {
    type: Sequelize.STRING(100)
  },
  web_name: {
    type: Sequelize.STRING(50)
  },
  web_desc: {
    type: Sequelize.TEXT
  },
  web_keywords: {
    type: Sequelize.STRING(50)
  },
  icp: {
    type: Sequelize.STRING(100)
  },
  email: {
    type: Sequelize.STRING(50)
  },
  closed: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  is_upload: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  is_talk: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  is_qn_upload: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  qn_access_key: {
    type: Sequelize.STRING(50)
  },
  qn_secret_key: {
    type: Sequelize.STRING(50)
  },
  qn_bucket_name: {
    type: Sequelize.STRING(50)
  }           
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: 'create_at',
  updatedAt: 'update_at',
  timestamps: true,
  tableName: `${config.dbprefix}web`
});
export default Web;