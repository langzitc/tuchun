import { User } from '../data/index.js'
export default async function (req,res,next) {
    switch (req.params.param) {
        case "test":  
            res.json({
                code: 200,
                msg: req.session.sid,
                user: req.session.user
            })
        break;         
        case "update_user": break;
        case "del_user": break;
        case "save_user": break;
        case "get_user": break;
        case "list_user": 
            let userList = await User.findAll();
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
    next();
}