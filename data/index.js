import { Connect } from "../until/index.js";
import User from './User.js'
import Role from './Role.js'
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
User.belongsTo(Role,{foreignKey: "roleid"});
User.belongsTo(UserInfo,{foreignKey: "infoid"});
Chanel.belongsTo(ChanelType,{foreignKey: 'typeid'});
Article.belongsTo(ArticleType,{foreignKey: 'typeid'});
Article.belongsTo(Chanel, {foreignKey: 'chanelid'});
RoleOperation.belongsTo(Role,{foreignKey: 'rid'});
RoleOperation.belongsTo(Operation,{foreignKey: 'oid'});
Talk.belongsTo(Article,{foreignKey: 'aid'});
Talk.belongsTo(User,{foreignKey: 'uid'});
UserOperation.belongsTo(User,{foreignKey: 'uid'});
UserOperation.belongsTo(Operation,{foreignKey: 'oid'});
let init = async () => {
    try {
        let role = Role.build({
            name: '系统管理员',
            code: '000000'
        });
        await role.save();
        let role2 = Role.build({
            name: '普通会员',
            code: '000001'    
        });
        await role2.save();
        console.log('初始化角色表成功');
        let user = User.build({
            tel: '18782913591',
            password: 'e10adc3949ba59abbe56e057f20f883e',
            email: '919777596@qq.com'
        })
        let userInfo = UserInfo.build();
        await userInfo.save();
        await user.save();
        await user.setRole(role);
        await user.setUserInfo(userInfo);      
    }catch(e){
        throw new Error(e)
    }
}
Connect.sync({force: true}).then(function () {
    console.log("----------------------");
    console.log("数据库同步成功");
    console.log("----------------------");
    init();    
});
export { User, Role, Article, ArticleType, Chanel, ChanelType, Classification, Operation, RoleOperation, Talk, UserInfo, UserOperation, Web }