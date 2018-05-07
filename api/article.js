import { Article, ArticleType, Chanel } from "../data";
export default async function (req,res,next) {
    try{
        switch (req.params.param) {
            case "update_article": 
                let ua = await Article.findById(req.body.id);
                await ua.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存文章成功'
                })       
            break;
            case "del_article": 
                await Article.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除文章成功'
                })                  
            break;
            case "save_article": 
                let sap = JSON.parse(JSON.stringify(req.body));
                let sctype = await ArticleType.findById(req.body.tid);
                let scchanel = await Chanel.findById(req.body.cid);
                delete sap.cid;
                delete sap.tid;
                let scd = await Article.build(sap);
                scd.save();
                scd.setArticleType(sctype);
                scd.setChanle(scchanel);
                res.json({
                    code: 200,
                    msg: '添加文章成功'
                })            
            break;
            case "get_article": 
                let gad = await Article.findOne({
                    where: {
                        id: req.body.id                         
                    },
                    include: [{
                        model: ArticleType,
                        as: 'articleType'
                    },{
                        model: Chanel,
                        as: 'chanel'
                    }]                     
                })
                res.json({
                    code: 200,
                    data: gad
                })                
            break;
            case "list_article": 
                let page = req.body.page;
                let offset = parseInt(req.body.pageSize);
                let limit = page*offset-offset;            
                let articleList = await Article.findAndCountAll({
                    limit: offset,
                    offset: limit,				  
                    include: [{
                        model: Chanel,
                        as: 'chanel'
                    },{
                        model: ArticleType,
                        as: 'articleType'
                    }]                    
                });
                console.log(articleList);
                res.json({
                    code: 200,
                    data: articleList
                })            
            break;
            case "update_article_type": 
                let uat = await ArticleType.findById(req.body.id);
                await uat.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存文章类型成功'
                }) 
            break;
            case "del_article_type": 
                await ArticleType.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除文章类型成功'
                })                 
            break;
            case "save_article_type": 
                let satp = JSON.parse(JSON.stringify(req.body));
                await ArticleType.build(satp).save();
                res.json({
                    code: 200,
                    msg: '添加文章类型成功'
                })             
            break;
            case "list_article_type": 
                let articletypeList = await ArticleType.findAll();
                res.json({
                    code: 200,
                    data: articletypeList
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