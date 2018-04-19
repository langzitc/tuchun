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
                let classicList = await Classification.findAll({
                    where: {
                        pid: req.body.pid||0
                    } 
                });
                let clf = (arr,pid) => {
                    let a = [];
                    arr.forEach(e=>{
                        if(e.pid === pid){
                            let obj = {};
                            obj.label = e.name;
                            obj.value = e.id;
                            obj.pid = e.pid;
                            let cl = arr.filter(e2=>{
                                return e2.pid === e.id;
                            })
                            if(cl.length){
                                obj.children = clf(arr,e.id);
                            }
                            a.push(obj);
                        }
                    })
                    return a;
                }
                res.json({
                    code: 200,
                    data: clf(classicList,0)
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