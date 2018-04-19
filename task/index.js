import schedule from 'node-schedule'
import { GetXml, SaveXml } from '../until'
import path from 'path'
import Crawler from 'crawler'
const crawler = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    priorityRange: 10,
    priority: 0,
    retries: 3,
    retryTimeout: 5000,
    jQuery: true,
    forceUTF8: true,

})
function Get (uri,callback) {
    return new Promise((resolve,reject)=>{
        crawler.direct({
            uri: uri,
            skipEventRequest: false,
            callback: (error,res) => {
                if(error){
                    reject(error);
                }else{
                    callback(res);
                    resolve(res);
                }
            }
        });        
    });
}
Get('https://news.hao123.com',(res)=>{
    let $ = res.$;
    let liarr = $("#qingsong .lunbo ul li");
    let arr = [];
    $(liarr).each(async function(){
        arr.push(
            {
                item: {
                    href: $(this).find('a').attr('href'),
                    title: $(this).find('a').attr('title'),
                    img: $(this).find('img').attr('src')                
                }                
            }            
        )
    }) 
    SaveXml(path.join(__dirname,'../log/crawler.xml'),arr);
}).finally(res=>{
    let arr = GetXml(path.join(__dirname,'../log/crawler.xml')).root.item;
    arr.forEach(e=>{
        crawler.queue({
            uri: e.href,
            callback (error,res,done) {
                if(error){
                    console.log(error)
                }else{
                    let $ = res.$;
                    let content = $('.pic-content').html();
                    console.log(content);
                }
            }
        })
        let prefix = e.img.split(".");
        crawler.queue({
            uri: e.img,
            encoding: null,
            jQuery: false,
            filename: path.join(__dirname,"../upload"+(new Date()).getTime()+"."+prefix[prefix.length-1]),
            callback (error,res,done) {
                if(error){
                    console.log(error)
                }else{
                    fs.createWriteStream(res.options.filename).write(res.body);    
                }
                done();
            }
        })        
    })
})
export function SystemTask () {
    let rule = new schedule.RecurrenceRule();
    rule.second = 20;
    schedule.scheduleJob(rule,()=>{
        console.log((new Date()).getSeconds())
    })
}