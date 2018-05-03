import { Shuoshuo, ShuoshuoZan, ShuoshuoTalk } from '../data'
export default async function (req,res,next) {
    try{
        switch(req.params.param){
            case 'list_shuoshuo': break;
            case 'del_shuoshuo': break;
            case 'zan_shuoshuo': break;
            case 'cancel_zan_shuoshuo': break;
            case 'talk_shuoshuo': break;
            case 'list_talk_shuoshuo': break;
            case 'talk_shuoshuo': break;
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