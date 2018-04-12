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
      name: 'Home',
  		component: function (resolve) {
  			require(['../components/Home.vue'],resolve);
  		}
    }        
  ]
})
