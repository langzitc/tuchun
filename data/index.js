import { Connect } from "../until/index.js";
import User from './User.js'
import Article from './Article.js'
import ArticleType from './ArticleType.js'
import Chanel from './Chanel.js'
import ChanelType from './ChanelType.js'
import Classification from './Classification.js'
import Operation from './Operation.js'
import RoleOperation from './RoleOperation.js'
import Talk from './Talk.js'
import UserInfo from './UserInfo.js'
import UserOperation from './UserOperation.js'
import Web from './Web.js'
Connect.sync({force: false}).then(function () {
    console.log("----------------------");
    console.log("数据库同步成功");
    console.log("----------------------");
});
export { User, Article, ArticleType, Chanel, ChanelType, Classification, Operation, RoleOperation, Talk, UserInfo, UserOperation, Web }