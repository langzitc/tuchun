import fs from 'fs'
import path from 'path'
import { SaveFile } from '../until'
import { Article, Chanel, ArticleType, ChanelType } from '../data'
const { exec } = require('child_process');
export default async function (req,res,next) {
    try{
        switch(req.params.param){
            case "task_list": 
                let jsonArr = [];  
                fs.readdirSync(path.join(__dirname,"../task")).forEach(function(filename){  
                    if(filename.includes('.json')){  
                        jsonArr.push(JSON.parse(fs.readFileSync(path.join(__dirname,"../task"+"/"+filename))));
                    }  
                })   
                res.json({
                    msg: '查询成功',
                    code: 200,
                    data: jsonArr
                });
            break;
            case "save_task": 
                SaveFile(path.join(__dirname,`../task/${req.body.taskName}.json`),JSON.stringify(req.body));
                res.json({
                    code: 200,
                    msg: '添加任务成功'
                });
            break;
            case "del_task": 
                let task = path.join(__dirname,`../task/${req.body.taskName}.json`); 
                let msg = '删除成功',code = 200;
                if(fs.existsSync(task)){
                    fs.unlinkSync(task);
                }else{
                    msg = '任务不存在';
                    code = 404;
                }
                res.json({
                    code: code,
                    msg: msg
                });                
            break;
            case "clear_task": 
                let task2 = path.join(__dirname,`../task/data/${req.body.taskName}`); 
                let msg2 = '删除成功',code2 = 200;
                if(fs.existsSync(task2)){
                    exec(`rd/s/q ${task2}`);
                }else{
                    msg2 = '没有可清除的数据';
                    code2 = 404;
                }
                res.json({
                    code: code2,
                    msg: msg2
                });                  
            break;
            case "import_task": 
                let dataArr = [];  
                let dirs = path.join(__dirname,`../task/data/${req.body.taskName}`);
                fs.readdirSync(dirs).forEach(function(filename){  
                    if(filename.includes('.json')){  
                        dataArr.push(JSON.parse(fs.readFileSync(path.join(dirs,filename))));
                    }  
                })          
                if(dataArr.length){
                    let chanel =  await Chanel.findOne({
                        where: {
                            name: req.body.taskName
                        }
                    })
                    if(!chanel){
                        chanel = await Chanel.build({
                            name: req.body.taskName,
                            desc: req.body.taskName,
                            chanel_template: 'article_list.ejs',
                            list_template: 'article_list.ejs',
                            article_template: 'article.ejs'
                        });
                        let chanelType = await ChanelType.findById(4);
                        chanel.save();
                        chanel.setChanelType(chanelType);
                    }                    
                    let i = 0;
                    while(i<dataArr.length){
                        let e = dataArr[i]
                        let articleType = await ArticleType.findById(4);
                        let article = await Article.build({
                            title: e.title,
                            desc: e.desc.substr(0,20),
                            content: e.content,
                            img: e.img
                        });
                        article.save();
                        article.setArticleType(articleType);
                        article.setChanel(chanel);
                        if(i === dataArr.length-1){
                            res.json({
                                code: 200,
                                msg: `成功导入${dataArr.length}条数据`
                            });
                        }
                        i++;
                    }                     
                }else{
                    res.json({
                        code: 202,
                        msg: '没有可导入的数据'
                    });
                }
            break;
        }
    }catch(e){
        res.json({
            code: 503,
            msg: e.toString()
        })        
    }
}