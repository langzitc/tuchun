import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
  		component: function (resolve) {
  			require(['../components/Login.vue'],resolve);
  		}
    },
    {
      path: '/',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/home',
  		component: function (resolve) {
  			require(['../components/Home.vue'],resolve);
      },
      children: [{
        path: '',
        redirect: {
          name: 'UserList'
        }
      },{
        path: 'userlist',
        name: 'UserList',
        component: function (resolve) {
          require(['../components/UserList.vue'],resolve);
        }, 
        meta: {
        	title: '用户列表'
        }
      }]
    }        
  ]
})
