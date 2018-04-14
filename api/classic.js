import { Classification } from '../data'
export default async function (req,res,next) {  
    try{
        switch (req.params.param) {
            case "update_classic": 
                let uc = await Classification.findById(req.body.id);
                await uc.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存分类成功'
                })                   
            break;
            case "del_classic": 
                await Classification.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除分类成功'
                })              
            break;
            case "save_classic": 
                let scd = await Classification.build({
                    name: req.body.name,
                    pid: req.body.pid
                });
                scd.save();
                res.json({
                    code: 200,
                    msg: '添加分类成功'
                })            
            break;
            case "list_classic":           
                let classicList = await Classification.findAndCountAll({
                    where: {
                        pid: req.body.pid||0
                    } 
                });
                res.json({
                    code: 200,
                    data: classicList
                })            
            break;
        }          
    }catch(e){
        res.json({
            code: 200,
            msg: e.toString()
        })
        throw new Error(e);
    }    
}