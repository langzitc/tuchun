import schedule from 'node-schedule'
import { GetJSONFile, SaveFile } from '../until'
import path from 'path'
import md5 from 'md5'
import fs from 'fs'
import Crawler from 'crawler'
const crawler = new Crawler({
    maxConnections: 1,
    rateLimit: 1000,
    priorityRange: 10,
    priority: 0,
    retries: 3,
    retryTimeout: 5000,
    jQuery: true,
    forceUTF8: true,

})
function Get (crawler,uri) {
    return new Promise((resolve,reject)=>{
        crawler.queue({
            uri: uri,
            skipEventRequest: false,
            callback: (error, res, done) => {
                if(error){
                    reject(error);
                }else{
                    resolve(res);
                }
                done();
            }
        });        
    });
}
function CrawlerInit () {
    let jsonArr;  
    fs.readdirSync(__dirname).forEach(function(filename){  
        if(filename.includes('.json')){  
            jsonArr = JSON.parse(fs.readFileSync(path.join(__dirname,filename)));
        }  
    })   
    if(Array.isArray(jsonArr)){
        jsonArr.forEach(async (e)=>{
            try{
                let res = await Get(crawler,e.uri);
                let $ = res.$;
                $(e.listRule).each(async function(){
                    let title = $(this).find(e.listTitle).text(),
                    desc = $(this).find(e.listDesc).text(),
                    img = $(this).find(e.listImg).attr('src'),
                    cres = await Get(crawler,$(this).find(e.listUri).attr('href'));
                    let $c = cres.$;
                    let content = unescape($c(e.content).html().replace(/&#x/g,'%u').replace(/;/g,'').replace(/%uA0/g,' '));
                    SaveFile(path.join(__dirname,"data/"+e.taskName+"/"+md5(title)+".json"),JSON.stringify({
                        title,
                        desc,
                        img,
                        content
                    }));
                })
            }catch(e){
                throw new Error(e)
            }
        })
    }
}
export function SystemTask () {
    let rule = new schedule.RecurrenceRule();
    rule.second = 50;
    schedule.scheduleJob(rule,()=>{
        console.log((new Date()).getSeconds())
    })
}
export function StartTask (filename,socket) {
    let crawlerTask = new Crawler({
        maxConnections: 1,
        rateLimit: 1000,
        priorityRange: 10,
        priority: 0,
        retries: 3,
        retryTimeout: 5000,
        jQuery: true,
        forceUTF8: true,
    
    })    
    let o = JSON.parse(fs.readFileSync(path.join(__dirname,filename+".json")));
    let urlArr = [];
    let p = new Promise((resolve,reject)=>{
        o.uri.forEach(async (url,i)=>{
            let fres = await Get(crawlerTask,url);
            let $ = fres.$;
            $(o.listRule).each(async function(){
                let title = $(this).find(o.listTitle).text(),
                desc = $(this).find(o.listDesc).text(),
                img = $(this).find(o.listImg).attr('src'),
                href = $(this).find(o.listUri).attr('href');
                urlArr.push({
                    title,
                    desc,
                    img,
                    url: href,
                    percent: 0              
                })
            })    
            socket.emit('start_new_task',urlArr);    
            if(i === o.uri.length-1){
                resolve();
            }
        })
    });
    p.then(()=>{
        urlArr.forEach(async (e,i)=>{
            let cres = await Get(crawlerTask,e.url);
            let $c = cres.$;
            let content = unescape($c(o.content).html().replace(/&#x/g,'%u').replace(/;/g,'').replace(/%uA0/g,' '));
            SaveFile(path.join(__dirname,"data/"+o.taskName+"/"+md5(e.title)+".json"),JSON.stringify({
                title: e.title,
                desc: e.desc,
                img: e.img,
                content
            })); 
            e.percent = 100;
            socket.emit('start_new_task',urlArr);       
            if(i === urlArr.length-1){
                socket.emit('task_finished'); 
            }
        })       
    })
}