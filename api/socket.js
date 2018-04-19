import schedule from 'node-schedule'
export default function (io) {
    io.on('connection', function (socket) {
        console.log(socket.id);
        let rule = new schedule.RecurrenceRule();
        rule.second = 30;
        schedule.scheduleJob(rule,()=>{
            if(!socket.request.session.user){
                socket.emit('loginout', { msg: '会话过期，请重新登录' }); 
            }
        })
        socket.on('my other event', function (data) {
          console.log(data);
        });
    });
}