    import io from 'socket.io-client';
    import iView from 'iview'
    import store from './store'
    import router from './router'
    const socket = io('http://localhost:4000');
	socket.on('connect', function(){
        iView.Notice.info({
            title: '欢迎回来！welcome to back'
        });		
	});
	socket.on('loginout', function(data){
        iView.Notice.info({
            title: data.msg,
            desc: '马上为您跳转到登录界面...'
        });	
        setTimeout(()=>{
			store.commit("updateUser",{});
			router.push({
				name: 'Login'
			})
        },3000)
	});
	socket.on('disconnect', function(){
		console.log('websocket disconnect');
	});
	export { socket }
