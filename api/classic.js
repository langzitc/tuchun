export default function (req,res,next) {
    switch (req.params.param) {
        case "update_classic": break;
        case "del_classic": break;
        case "save_classic": break;
        case "get_classic": break;
        case "list_classic": break;
    }    
    next();    
}