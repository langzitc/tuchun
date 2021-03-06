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
      },{
        path: 'chanellist',
        name: 'ChanelList',
        component: function (resolve) {
          require(['../components/ChanelList.vue'],resolve);
        }, 
        meta: {
        	title: '栏目列表'
        }
      },{
        path: 'addchanel',
        name: 'AddChanel',
        component: function (resolve) {
          require(['../components/AddChanel.vue'],resolve);
        }, 
        meta: {
        	title: '添加栏目'
        }
      },{
        path: 'chaneltype',
        name: 'ChanelType',
        component: function (resolve) {
          require(['../components/ChanelType.vue'],resolve);
        }, 
        meta: {
        	title: '栏目类型'
        }
      },{
        path: 'template',
        name: 'Template',
        component: function (resolve) {
          require(['../components/Template.vue'],resolve);
        }, 
        meta: {
        	title: '模板管理'
        }
      },{
        path: 'articlelist',
        name: 'ArticleList',
        component: function (resolve) {
          require(['../components/ArticleList.vue'],resolve);
        }, 
        meta: {
        	title: '文章列表'
        }
      },{
        path: 'addarticle',
        name: 'AddArticle',
        component: function (resolve) {
          require(['../components/AddArticle.vue'],resolve);
        }, 
        meta: {
        	title: '文章管理'
        }
      },{
        path: 'articletype',
        name: 'ArticleType',
        component: function (resolve) {
          require(['../components/ArticleType.vue'],resolve);
        }, 
        meta: {
        	title: '文章类型管理'
        }
      },{
        path: 'classisic',
        name: 'Classisic',
        component: function (resolve) {
          require(['../components/Classisic.vue'],resolve);
        }, 
        meta: {
        	title: '分类管理'
        }
      },{
        path: 'storylist',
        name: 'StoryList',
        component: function (resolve) {
          require(['../components/StoryList.vue'],resolve);
        }, 
        meta: {
        	title: '小说列表'
        }
      },{
        path: 'talklist',
        name: 'TalkList',
        component: function (resolve) {
          require(['../components/TalkList.vue'],resolve);
        }, 
        meta: {
        	title: '评论列表'
        }
      },{
        path: 'collecttask',
        name: 'CollectTask',
        component: function (resolve) {
          require(['../components/CollectTask.vue'],resolve);
        }, 
        meta: {
        	title: '任务列表'
        }
      },{
        path: 'collectdata',
        name: 'CollectData',
        component: function (resolve) {
          require(['../components/CollectTask.vue'],resolve);
        }, 
        meta: {
        	title: '数据导入'
        }
      },{
        path: 'picturelist',
        name: 'PictureList',
        component: function (resolve) {
          require(['../components/PictureList.vue'],resolve);
        }, 
        meta: {
        	title: '相册管理'
        }
      }]
    }        
  ]
})
