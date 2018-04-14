import schedule from 'node-schedule'
import { GetXml } from '../until'
import path, { dirname } from 'path'
export function SystemTask () {
    setTimeout(()=>{
        console.log('------xml reader-------');
        let url = path.join(__dirname,'../config/crawer.config.xml');
        GetXml(url).then(res=>{
            console.log(res)
        });        
    },3000)
    let rule = new schedule.RecurrenceRule();
    rule.second = 20;
    schedule.scheduleJob(rule,()=>{
        console.log((new Date()).getSeconds())
    })
}