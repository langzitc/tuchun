import { Connect } from "../until/index.js";
import Sequelize from "sequelize";
import config from '../config/db.js';
const User = Connect.define('user', {
  id: {
  	type: Sequelize.INTEGER,
  	field: "id",
  	autoIncrement: true,
  	primaryKey: true,
  	allowNull: false
  },
  tel: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  email: {
  	type: Sequelize.STRING(50),
  	allowNull: false
  },
  weixin: {
  	type: Sequelize.STRING(50),
  },
  qq: {
  	type: Sequelize.BIGINT
  },
  avastar: {
  	type: Sequelize.STRING(100)
  },
  nick: {
  	type: Sequelize.STRING(20)
  },
  tocken: {
  	type: Sequelize.STRING(100),
  },
  flag: {
  	type: Sequelize.INTEGER,
  	defaultValue: 1
  }
}, 
{
  freezeTableName: false, // Model 对应的表名将与model名相同
  createdAt: true,
  updatedAt: true,
  tableName: `${config.dbprefix}user`
});
User.login = (name,pwd) => {
  return User.find({
    where: {
      password: pwd,
      $and: {
        $or: [{tel:name},{email:name}]
      }
    }
  })
}
export default User;