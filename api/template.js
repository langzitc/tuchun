export default function (req,res,next) {
    switch (req.params.param) {
        case "update_template": break;
        case "del_template": break;
        case "save_template": break;
        case "get_template": break;
        case "list_template": break;
    }    
    next();    
}