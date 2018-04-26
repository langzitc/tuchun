<style lang="less">
.layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    width: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: transparent;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    img{
    	height: 30px;
    }
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout{
    height: 100%;
}
.ivu-layout-sider-children{
    background-color: #495060;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                    	<img src="../assets/logo2.png" alt="" />
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="home"></Icon>
                            <a href="/">首页</a>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="settings"></Icon>
                            设置
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            导航
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="person"></Icon>
                            Administrator
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu :active-name="index" theme="dark" width="auto" @on-select="menuSelect" :open-names="openNames">
                        <Submenu :name="el.id" v-for="el in Menu" :key="el.id">
                            <template slot="title">
                                <Icon :type="el.icon"></Icon>
                                {{el.label}}
                            </template>
                            <MenuItem v-if="el.children&&el.children.length" v-for="el2 in el.children" :key="el2.id" :name="el2.id">{{el2.label}}</MenuItem>
                        </Submenu>                                                                                               
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}" class="text-left">
                    	<BreadcrumbItem :to="{ path: '/home' }">首页</BreadcrumbItem>
                        <BreadcrumbItem v-for="(el,index) in routeList" v-show="index!==0" :to="{ name: el.name }" :key="index">{{el.meta.title}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <transition name="app">
                            <router-view/>
                        </transition>  
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import Menu from '../menu.js'
    import { mapState } from 'vuex'
    import { socket } from '../socket'
    export default {
        data () {
            return {
                Menu,
                index: 11,
                openNames: [1]
            }
        },
		computed: {
			...mapState({
				routeList: state => state.routes
			})
		},        
        methods: {
            menuSelect (name) {
                let c;
                Menu.forEach(e=>{
                    if(e.id == name){
                        if(e.component){
                            c = e.component;
                        }
                    }else{
                        if(e.children){
                            e.children.forEach(e2=>{
                                if(e2.id == name){
                                    c = e2.component;
                                }
                            })                            
                        }
                    }
                })
                if(c){
                    this.$router.push({
                        name: c
                    });                     
                }
            }
        }
    }
</script>