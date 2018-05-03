import { Picture, PictureGroup, User } from '../data'
export default async function (req,res,next) {
    try{
        switch(req.params.param){
            case 'get_picture_group': break;
            case 'del_picture_group': break;
            case 'save_picture_group': break;
            case 'update_picture_group': break;
            case 'list_picture_group': break;
            case 'add_picture': break;
            case 'update_picture': break;
            case 'del_picture': break;
            case 'list_picture': break;
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