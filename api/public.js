export default function (req,res,next) {
    switch (req.params.param) {
        case "admin_login": break;
        case "user_login": break;
        case "user_register": break;
        case "user_destory": break;
        case "admin_destory": break;
        case "get_sys_set": break;
        case "update_sys_set": break;
        case "update_role": break;
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