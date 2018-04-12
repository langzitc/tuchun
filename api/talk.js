export default function (req,res,next) {
    switch (req.params.param) {
        case "update_talk": break;
        case "del_talk": break;
        case "save_talk": break;
        case "get_talk": break;
        case "list_talk": break;
    }    
    next();    
}