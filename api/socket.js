import schedule from 'node-schedule'
import { StartTask } from '../task'
export default function (io) {
    io.on('connection', function (socket) {
        let rule = new schedule.RecurrenceRule();
        rule.minute = 30;
        schedule.scheduleJob(rule,()=>{
            if(!socket.request.session.user){
                socket.emit('loginout', { msg: '会话过期，请重新登录' }); 
            }
        })
        socket.on('my other event', function (data) {
          console.log(data);
        });
        socket.on('crawler', function (filename){
            StartTask(filename,socket);
        })
    });
}