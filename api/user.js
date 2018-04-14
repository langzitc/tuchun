import { User, Role, UserInfo } from '../data'
import md5 from 'md5'
export default async function (req,res,next) {
    try{
        switch (req.params.param) {       
            case "update_user": 
                let uu = await User.findById(req.body.id);
                await uu.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存成功'
                })                
            break;
            case "del_user": 
                await User.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除成功'
                })
            break;
            case "save_user": 
                let isUser = User.find({
                    where: {
                        $or: [{tel:req.body.tel},{email:req.body.email}]
                      }                    
                });
                if(isUser.id){
                    res.json({
                        code: 201,
                        msg: '用户已存在'
                    });                    
                    return;
                }
                let rbd = JSON.parse(JSON.stringify(req.body));
                rbd.password = md5(rbd.password);
                let newUser = User.build(rbd);
                await newUser.save();
                let newUserInfo = UserInfo.build();
                await newUserInfo.save();
                let newUserRole = await Role.findById(1);
                newUser.setRole(newUserRole);
                newUser.setUserInfo(newUserInfo);
                res.json({
                    code: 200,
                    msg: '添加成功'
                });
            break;
            case "get_user": 
                let gud = await User.findOne({
                    where: {
                        id: req.body.id                         
                    },
                    include: [{
                        model: Role,
                        as: 'role'
                    },{
                        model: UserInfo,
                        as: 'userInfo'
                    }]                     
                })
                res.json({
                    code: 200,
                    data: gud
                })
            break;
            case "list_user": 
                let page = req.body.page;
                let offset = parseInt(req.body.pageSize);
                let limit = page*offset-offset;            
                let userList = await User.findAndCountAll({
                    limit: offset,
                    offset: limit,
                    where: {
                        id: {
                            $ne: 1
                        }
                    },				  
                    include: [{
                        model: Role,
                        as: 'role'
                    }]                    
                });
                res.json({
                    code: 200,
                    data: userList
                })
            break;
            case "update_user_operation": break;
            case "del_use_operationr": break;
            case "save_user_operation": break;
            case "get_user_operation": break;
            case "list_user_operation": break;        
        }    
    }catch(e){
        res.json({
            code: 503,
            msg: e.toString()
        })
        throw new Error(e);
        next();
    }
}