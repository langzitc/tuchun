import { Chanel, ChanelType } from '../data'
export default async function (req,res,next) {
    try{
        switch (req.params.param) {
            case "update_chanel": 
                let uc = await Chanel.findById(req.body.id);
                await uc.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存栏目成功'
                })             
            break;
            case "del_chanel": 
                await Chanel.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除栏目成功'
                })                
            break;
            case "save_chanel": 
                let scp = JSON.parse(JSON.stringify(req.body));
                let sctype = await ChanelType.findById(req.body.cid);
                delete scp.cid;
                let scd = await Chanel.build(scp);
                scd.save();
                scd.setChanelType(sctype);
                res.json({
                    code: 200,
                    msg: '添加栏目成功'
                })
            break;
            case "get_chanel": 
                let gcd = await Chanel.findOne({
                    where: {
                        id: req.body.id                         
                    },
                    include: [{
                        model: ChanelType,
                        as: 'chanelType'
                    }]                     
                })
                res.json({
                    code: 200,
                    data: gcd
                })
            break;
            case "list_chanel": 
                let page = req.body.page;
                let offset = parseInt(req.body.pageSize);
                let limit = page*offset-offset;            
                let chanelList = await Chanel.findAndCountAll({
                    limit: offset,
                    offset: limit,				  
                    include: [{
                        model: ChanelType,
                        as: 'chanelType'
                    }]                    
                });
                res.json({
                    code: 200,
                    data: chanelList
                })
            break;
            case "update_chanel_type": 
                let uct = await ChanelType.findById(req.body.id);
                await uct.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存栏目类型成功'
                })                 
            break;
            case "del_chanel_type": 
                await ChanelType.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除栏目类型成功'
                })             
            break;
            case "save_chanel_type": 
                let sctp = JSON.parse(JSON.stringify(req.body));
                await ChanelType.build(sctp).save();
                res.json({
                    code: 200,
                    msg: '添加栏目类型成功'
                })            
            break;
            case "list_chanel_type":             
                let chaneltypeList = await Chanel.findAll();
                res.json({
                    code: 200,
                    data: chaneltypeList
                })                
            break;        
        }         
    }catch(e){
        res.json({
            code: 503,
            msg: e.toString()
        })
        throw new Error(e);
    }
}