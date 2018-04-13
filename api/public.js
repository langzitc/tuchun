import md5 from 'md5'
import { RedisClient } from '../until/index.js'
import { User, Web } from '../data/index.js'
export default async function (req,res,next) {
    switch (req.params.param) {
        case "test":  
            res.json({
                code: 200,
                msg: 'test'
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
            let uwebSet = await Web.findOne({
                where: {
                    id: 1
                }
            });
            req.body.template_path ? uwebSet.setDataValue('template_path',req.body.template_path) : false;
            req.body.upload_path ? uwebSet.setDataValue('upload_path',req.body.upload_path) : false;
            req.body.web_name ? uwebSet.setDataValue('web_name',req.body.web_name) : false;
            req.body.web_desc ? uwebSet.setDataValue('web_desc',req.body.web_desc) : false;
            req.body.web_keywords ? uwebSet.setDataValue('web_keywords',req.body.web_keywords) : false;
            req.body.icp ? uwebSet.setDataValue('icp',req.body.icp) : false;
            req.body.email ? uwebSet.setDataValue('email',req.body.email) : false;
            req.body.closed ? uwebSet.setDataValue('closed',req.body.closed) : false;
            req.body.is_upload ? uwebSet.setDataValue('is_upload',req.body.is_upload) : false;
            req.body.is_talk ? uwebSet.setDataValue('is_talk',req.body.is_talk) : false;
            req.body.is_qn_upload ? uwebSet.setDataValue('is_qn_upload',req.body.is_qn_upload) : false;
            req.body.qn_access_key ? uwebSet.setDataValue('qn_access_key',req.body.qn_access_key) : false;
            req.body.qn_secret_key ? uwebSet.setDataValue('qn_secret_key',req.body.qn_secret_key) : false;
            req.body.qn_bucket_name ? uwebSet.setDataValue('qn_bucket_name',req.body.qn_bucket_name) : false;
        break;
        case "update_role": 
            
        break;
        case "del_role": break;
        case "save_role": break;
        case "get_role": break;
        case "list_role": break;
        case "update_role_operation": break;
        case "del_role_operation": break;
        case "save_role_operation": break;
        case "get_role_operation": break;
        case "list_role_operation": break;                
    }
    next();
}