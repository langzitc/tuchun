import { Article, ArticleType, Chanel } from '../data'
function GetTreeLine (arr,id) {
	let map = new Map();
	let f = (arrs,index) => {
		for (let e of arrs) {
			map.set(index,e);
			if(e.id === id){
				break;
            }
            let arr2 = arrs.filter(e2=>{
                return e2.pid === e.id;
            })
			if(arr2.length){
				f(arr,index+1);
			}
		}		
	}
	f(arr,0);
	return [...map.values()];
}
export default async function (req,res,next){   
    try{
        function getNewDataByTime () {
            return Article.findAll({
                limit: 10,
                offset: 0,
                order: [['create_at','DESC']]
            });
        }
        async function getChanel () {
            let cl = await Chanel.findAll({
                attributes: ['id','name','pid']
            });
            let c = cl.filter(e=>{
                return e.id = req.query.cid;
            })[0];
            return GetTreeLine(cl,c.id);
        }
        switch (req.params.page){
            case "home": 
                res.render('index.ejs', {
                    title: '首页-阿正个人网站',
                    desc: 'tuchun website',
                    keywords: '阿正',
                    data: await getNewDataByTime()
                });          
            break;
            case "comment": 
                res.render('comment.ejs', {
                    title: 'tuchun',
                    desc: 'tuchun website',
                    keywords: 'tuchun web'
                });         
            break;
            case "article_detail": 
                let articleDetail = await Article.findById(req.query.aid);
                res.render('article_detail.ejs', {
                    title: articleDetail.title,
                    desc: articleDetail.desc,
                    keywords: articleDetail.keywords,
                    detail: articleDetail,
                    newData: await getNewDataByTime(),
                    chanel: await getChanel()
                });         
            break;
            case "article_info": 
                let query = req.query;
                let page = query.page||1;
                let offset = parseInt(query.pageSize)||10;
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
                let newData = await getNewDataByTime();
                let pageCount = articleList.count%offset === 0 ? articleList.count/offset : parseInt(articleList.count/offset)+1;
                res.render('article.ejs', {
                    title: '文章-阿正个人网站',
                    desc: 'tuchun website',
                    keywords: 'tuchun web',
                    page,
                    pageCount,
                    articleList,
                    newData,
                    chanel: await getChanel()
                });        
            break;
            case "article_list": 
                res.render('article_list.ejs', {
                    title: 'tuchun',
                    desc: 'tuchun website',
                    keywords: 'tuchun web'
                });        
            break;
            case "404": 
                res.render('404.ejs', {
                    title: 'tuchun',
                    desc: 'tuchun website',
                    keywords: 'tuchun web'
                });              
            break;
            default: 
                res.redirect('/404');
            break;
        }        
    }catch(e){
        res.render('500.ejs', {
            title: 'tuchun',
            desc: 'tuchun website',
            keywords: 'tuchun web',
            msg: e.toString()
        });   
    }
}