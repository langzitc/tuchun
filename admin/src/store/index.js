import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
        user: {},
        isLogin: false,
        routes: []
	},
	mutations: {
		updateUser (state,user) {
            if(user&&user.id){
                Object.assign(state.user,user);
                state.isLogin = true;
            }else{
                state.isLogin = false;
            }
        },
        routeInit (state, payload) {
        	state.routes = payload;
        }
	},
	actions: {
		login ({commit},param) {
            return new Promise((resolve,reject)=>{
                axios.post('/public/user_login',param).then(res=>{
                    if(res.code === 200) {
                        commit('updateUser',res.data);
                        localStorage.setItem('tuch_admin_user',JSON.stringify(res.data));
                        resolve(res.msg);
                    }else{
                        reject(res.msg);
                    }
                }).catch(e=>{
                    reject('登录失败');
                    throw new Error(e);
                })                
            })
        }
	}
})