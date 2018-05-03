import { Talk, User, Article } from '../data'
export default async function (req,res,next) {
    try{
        switch (req.params.param) {
            case "del_talk": 
                await Talk.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除评论成功'
                })              
            break;
            case "save_talk": 
                let scp = JSON.parse(JSON.stringify(req.body));
                let scuser = await User.findById(req.body.uid);
                let scarticle = await Article.findById(req.body.aid);
                delete scp.uid;
                delete scp.aid;
                let scd = await Talk.build(scp);
                scd.save();
                scd.setArticle(scarticle);
                scd.setUser(scuser);
                res.json({
                    code: 200,
                    msg: '评论成功'
                })                    
            break;
            case "list_talk": 
                let page = req.body.page;
                let offset = parseInt(req.body.pageSize);
                let limit = page*offset-offset;            
                let talklList = [];
                if(req.body.aid){
                    talklList = await Talk.findAndCountAll({
                        where: {
                            aid: req.body.aid
                        },
                        limit: offset,
                        offset: limit,				  
                        include: [{
                            model: User,
                            as: 'user'
                        }]                    
                    });                    
                }else if(req.body.uid){
                    talklList = await Talk.findAndCountAll({
                        where: {
                            uid: req.body.uid
                        },
                        limit: offset,
                        offset: limit,				  
                        include: [{
                            model: Article,
                            as: 'article'
                        }]                    
                    });                    
                }
                res.json({
                    code: 200,
                    data: talklList
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