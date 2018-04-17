var gaze = require('gaze');  
var exec = require('child_process').exec;  

function Watch(){  
    gaze('./api/*.*',function(error,watcher){  
        this.on('all', function(event, filepath) {    
            Geneartion();  
        })  
    });  
}  

function Geneartion(){  
    var msg = exec('npm run api');  
    msg.stdout.on('data', function (data) {  
        console.log('生成 Api->',data);  
    });  

    msg.stderr.on('data', function (data) {  
        console.log('生成出错->',data);  
    });  
}  

Geneartion();  
Watch();  
console.log('API 自动监听中......');  