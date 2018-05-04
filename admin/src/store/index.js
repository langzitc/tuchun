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
        articleTypeList: [],
        chanelList: [],
        chanelTreeList: [],
        templateList: [],
        classicList: []
	},
	mutations: {
		updateUser (state,user) {
            if(user&&user.id){
                Object.assign(state.user,user);
                state.isLogin = true;
            }else{
                state.user = {};
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
        setChanelTreeList (state, payload) {
        	state.chanelTreeList = payload;
        },        
        setTemplateList (state, payload) {
        	state.templateList = payload;
        },
        setArticleTypeList (state, payload) {
        	state.articleTypeList = payload;
        },
        setClassicList (state, payload) {
        	state.classicList = payload;
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
        destory ({commit}) {
            return new Promise((resolve,reject)=>{
                axios.post('/public/user_destory').then(res=>{
                    if(res.code === 200) {
                        commit('updateUser',{});
                        localStorage.removeItem('tuch_admin_user');
                        resolve(res.msg);
                    }else{
                        reject(res.msg);
                    }
                }).catch(e=>{
                    reject('注销失败');
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
        getChanelTreeList ({commit}) {
            return new Promise((resolve,reject)=>{
                axios.post('/chanel/chanel_list_tree').then(res=>{
                    if(res.code === 200) {
                        commit('setChanelTreeList',res.data);
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
        },
        getArticleType ({commit}) {
            return new Promise((resolve,reject)=>{
                axios.post('/article/list_article_type').then(res=>{
                    if(res.code === 200) {
                        commit('setArticleTypeList',res.data);
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
        getClassicList ({commit}) {
            return new Promise((resolve,reject)=>{
                axios.post('/classic/list_classic').then(res=>{
                    if(res.code === 200) {
                        commit('setClassicList',res.data);
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