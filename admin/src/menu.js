export default [{
    id: 1,
    label: '用户管理',
    icon: 'ios-navigate',
    children: [{
        id: 11,
        icon: 'ios-navigate',
        label: '用户列表',
        component: 'UserList'
    }]
},{
    id: 2,
    label: '栏目管理',
    icon: 'ios-navigate',
    children: [{
        id: 21,
        icon: 'ios-navigate',
        label: '栏目列表',
        component: 'ChanelList'
    },{
    	id: 22,
    	icon: 'plus',
    	label: '添加栏目',
    	component: 'AddChanel'
    },{
    	id: 23,
    	icon: 'funnel',
    	label: '栏目类型',
    	component: 'ChanelType'
    },{
    	id: 24,
    	icon: 'funnel',
    	label: '模板管理',
    	component: 'Template'
    }]
},{
    id: 3,
    label: '文章管理',
    icon: 'ios-navigate',
    children: [{
        id: 31,
        icon: 'ios-navigate',
        label: '文章列表',
        component: 'ArticleList'
    },{
        id: 32,
        icon: 'ios-navigate',
        label: '发布文章',
        component: 'AddArticle'
    },{
        id: 33,
        icon: 'ios-navigate',
        label: '文章类型',
        component: 'ArticleType'
    }]
},{
    id: 4,
    label: '小说管理',
    icon: 'ios-navigate',
    children: [{
        id: 41,
        icon: 'ios-navigate',
        label: '小说列表',
        component: 'StoryList'
    }]
},{
    id: 5,
    label: '评论管理',
    icon: 'ios-navigate',
    children: [{
        id: 51,
        icon: 'ios-navigate',
        label: '评论列表',
        component: 'TalkList'
    }]
},{
    id: 6,
    label: '资源管理',
    icon: 'ios-navigate',
    children: [{
        id: 61,
        icon: 'ios-navigate',
        label: '相册',
        component: 'PictureList'
    },{
        id: 62,
        icon: 'ios-navigate',
        label: '图片',
        component: 'Picture'
    },{
        id: 63,
        icon: 'ios-navigate',
        label: '文档',
        component: 'Document'
    }]
},{
    id: 7,
    label: '数据库管理',
    icon: 'ios-navigate',
    children: [{
        id: 71,
        icon: 'ios-navigate',
        label: '备份',
        component: 'DataBack'
    },{
        id: 72,
        icon: 'ios-navigate',
        label: '更新',
        component: 'DataUpdate'
    },{
        id: 73,
        icon: 'ios-navigate',
        label: '命令',
        component: 'DataCommand'
    }]
},{
    id: 8,
    label: '采集管理',
    icon: 'ios-navigate',
    children: [{
        id: 81,
        icon: 'ios-navigate',
        label: '任务',
        component: 'CollectTask'
    },{
        id: 82,
        icon: 'ios-navigate',
        label: '数据导入',
        component: 'CollectData'
    }]
},{
    id: 9,
    label: '分类管理',
    icon: 'ios-navigate',
    children: [{
        id: 91,
        icon: 'ios-navigate',
        label: '分类管理',
        component: 'Classisic'
    }]
},{
    id: 10,
    label: '说说管理',
    icon: 'ios-navigate',
    children: [{
        id: 101,
        icon: 'ios-navigate',
        label: '说说',
        component: 'Shuoshuo'
    },{
        id: 102,
        icon: 'ios-navigate',
        label: '留言',
        component: 'Liuyan'
    }]
}]