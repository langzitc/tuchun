import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
        user: {},
        isLogin: false,
        routes: [],
        chanelTypeList: [],
        chanelList: [],
        templateList: []
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
        },
        setChanelType (state, payload) {
        	state.chanelTypeList = payload;
        },
        setChanelList (state, payload) {
        	state.chanelList = payload;
        },
        setTemplateList (state, payload) {
        	state.templateList = payload;
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
        },
        getChanelType ({commit}) {
            return new Promise((resolve,reject)=>{
                axios.post('/chanel/list_chanel_type').then(res=>{
                    if(res.code === 200) {
                        commit('setChanelType',res.data);
                        resolve();
                    }else{
                        reject(res.msg);
                    }
                }).catch(e=>{
                    reject(e.toString());
                    throw new Error(e);
                })                
            })        	
        },
        getChanelList ({commit}) {
            return new Promise((resolve,reject)=>{
                axios.post('/chanel/list_chanel').then(res=>{
                    if(res.code === 200) {
                        commit('setChanelList',res.data);
                        resolve();
                    }else{
                        reject(res.msg);
                    }
                }).catch(e=>{
                    reject(e.toString());
                    throw new Error(e);
                })                
            })           	
        },
        getTemplateList ({commit}) {
            return new Promise((resolve,reject)=>{
                axios.post('/template/list_template').then(res=>{
                    if(res.code === 200) {
                        commit('setTemplateList',res.data);
                        resolve();
                    }else{
                        reject(res.msg);
                    }
                }).catch(e=>{
                    reject(e.toString());
                    throw new Error(e);
                })                
            })           	
        }        
	}
})