import md5 from 'md5'
import { RedisClient } from '../until/index.js'
import { User, Web, Role, RoleOperation, Operation } from '../data/index.js'
export default async function (req,res,next) {
    try{
        switch (req.params.param) {
            case "test":  
                res.json({
                    code: 200,
                    msg: req.session.sid,
                    user: req.session.user
                })
            break;       
            case "user_login": 
                let user = await User.login(req.body.username,md5(req.body.password));
                req.session.user = user.dataValues;
                if(user.dataValues){
                    res.json({
                        code: 200,
                        msg: '登录成功',
                        data: user.dataValues
                    })
                    return;                
                }
                res.json({
                    code: 503,
                    msg: '登录失败',
                    data: {}
                })            
            break;
            case "user_register": 
                let users = User.build(req.body);
                let f = await users.save();
                if(f){
                    res.json({
                        code: 200,
                        msg: '注册成功',
                        data: f
                    })
                    return;                 
                }
                res.json({
                    code: 504,
                    msg: '注册失败'
                })
            break;
            case "user_destory": 
                if(req.session.user){
                    delete req.session.user;
                }
                res.json({
                    code: 200,
                    msg: '注销成功'
                });
            break;
            case "get_sys_set": 
                let webSet = await Web.findOne({
                    where: {
                        id: 1
                    }
                });
                res.json({
                    code: 200,
                    data: webSet.dataValues
                });
            break;
            case "update_sys_set": 
                let uss = await Web.findById(1);
                await uss.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存成功'
                }) 
            break;
            case "update_role": 
                let ur = await Role.findById(req.body.id);
                await ur.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存成功'
                })             
            break;
            case "del_role": 
                await Role.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                res.json({
                    code: 200,
                    msg: '删除成功'
                })        
            break;
            case "save_role": 
                await Role.build({
                    name: req.body.name,
                    code: md5(new Date())
                }).save();
                res.json({
                    code: 200,
                    msg: '添加成功'
                })             
            break;
            case "list_role": 
                let lrList = await Role.findAll();
                res.json({
                    code: 200,
                    msg: '查询成功',
                    data: lrList
                });
            break;
            case "update_role_operation": 
                let uroBean = await RoleOperation.findById(req.body.id);
                let uroOper = await Operation.findById(oid);
                let uroRole = await Role.findById(rid);
                uroBean.setOperation(uroOper);
                uroBean.setRole(uroRole);
                res.json({
                    code: 200,
                    msg: '更新成功'
                });
            break;
            case "del_role_operation": 
                await RoleOperation.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                res.json({
                    code: 200,
                    msg: '删除成功'
                })             
            break;
            case "save_role_operation": 
                let sroBean = RoleOperation.build();
                let sroRole = await Role.findById(req.body.rid);
                let sroOper = await Operation.findById(req.body.oid);
                sroBean.save();
                sroBean.setOperation(sroOper);
                sroBean.setRole(sroRole);
                res.json({
                    code: 200,
                    msg: '添加成功'
                });
            break;
            case "get_role_operation": 
                let groParam = {};
                if(req.body.rid){
                    groParam.rid = req.body.rid;
                }
                if(req.body.oid){
                    groParam.oid = req.body.oid;
                }
                let grod = await RoleOperation.findAndCountAll({
                    where: groParam,
                    include: [{
                        model: Role,
                        as: 'role'
                    },{
                        model: Operation,
                        as: 'operation'
                    }]                     
                })
                res.json({
                    code: 200,
                    data: grod
                })               
            break;
            case "list_role_operation": 
                let lrpage = req.body.page;
                let lroffset = parseInt(req.body.pageSize);
                let lrlimit = lrpage*lroffset-lroffset;            
                let roleOperList = await RoleOperation.findAndCountAll({
                    limit: lroffset,
                    offset: lrlimit,				  
                    include: [{
                        model: Role,
                        as: 'role'
                    },{
                        model: Operation,
                        as: 'operation'
                    }]                  
                });
                res.json({
                    code: 200,
                    data: roleOperList
                })         
            break;                
        }        
    }catch(e){
        res.json({
            code: 503,
            msg: e.toString()
        })
    }
}