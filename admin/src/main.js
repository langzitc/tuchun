import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import qs from 'qs'
import store from './store'
import './base.less'
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Promise.prototype.complete = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
Vue.use(iView)
axios.defaults.baseURL = API_PATH;
axios.defaults.transformRequest = (data)=>{
  if(data){
    return  qs.stringify(data);
  }
  return;
}
axios.interceptors.response.use(function(response){
		if(response.data.code === 502){
			localStorage.removeItem('tuch_admin_user');
			store.commit('updateUser',{});
		}
	  return response.data;
},function(error){
    return Promise.reject(error);
});
axios.defaults.headers = {
	'Content-type': 'application/x-www-form-urlencoded'
}
axios.defaults.withCredentials = true;
let dataInit = ()=>{
  let user = localStorage.getItem('tuch_admin_user');
  if(user){
    store.commit('updateUser',JSON.parse(user));
  }
}
dataInit();
router.beforeEach((to,from,next)=>{
  if(to.name !== 'Login' && !store.state.isLogin) {
    router.push({
      name: 'Login'
    })
    return;
  }else if(to.name === 'Login' && store.state.isLogin) {
    router.push({
      path: '/home'
    })
    return;
  }
	iView.LoadingBar.start();
	next();
})
router.afterEach((to) => {
  iView.LoadingBar.finish();
  store.commit('routeInit',to.matched);
  window.scrollTo(0, 0);
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
