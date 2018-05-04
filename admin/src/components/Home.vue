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
    width: 520px;
    position: absolute;
    right: 0;
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
                            <Dropdown trigger="click" @on-click="handleDropDownClick">
                                <a href="javascript:void(0)" style="color:#fff">
                                    <Icon type="person"></Icon>
                                    {{user.nick||user.tel}}&nbsp;&nbsp;
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="updatePassword">修改密码</DropdownItem>
                                    <DropdownItem name="destroy">注销</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                        <Modal
                            transfer
                            width="500px"
                            title="修改密码"
                            v-model="modalState"
                            :loading="modalState"
                            :mask-closable="false"
                        >
                            <div slot="footer">
                                <Button type="primary" @click="handleSubmit">确定</Button>
                                <Button type="default" @click="handleCancel">取消</Button>
                            </div>                   
                            <Form ref="passwordForm" :model="passwordForm" :rules="passwordRule" :label-width="80">
                                <FormItem label="旧密码" prop="oldpassword">
                                    <Input type="password" v-model="passwordForm.oldpassword"></Input>
                                </FormItem>
                                <FormItem label="新密码" prop="newpassword">
                                    <Input type="password" v-model="passwordForm.newpassword"></Input>
                                </FormItem>
                                <FormItem label="确认密码" prop="rnewpassword">
                                    <Input type="password" v-model="passwordForm.rnewpassword"></Input>
                                </FormItem>                                
                            </Form>                                     
                        </Modal>
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
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.passwordForm.newpassword !== '') {
                        this.$refs.passwordForm.validateField('newpassword');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认新密码'));
                } else if (value !== this.passwordForm.rnewpassword) {
                    callback(new Error('两次密码不一致!'));
                } else {
                    callback();
                }
            };            
            return {
                Menu,
                index: 11,
                openNames: [1],
                modalState: false,
                passwordForm: {
                    oldpassword: '',
                    newpassword: '',
                    rnewpassword: ''
                },
                passwordRule: {
                    oldpassword: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' }
                    ],
                    newpassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ],   
                    rnewpassword: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],                                     
                }
            }
        },
		computed: {
			...mapState({
				routeList: state => state.routes,
                user: state => state.user
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
            },
            handleDropDownClick (name) {
                switch (name) {
                    case "updatePassword": 
                        this.modalState = true;
                    break;
                    case "destroy": 
                        this.$store.dispatch('destory').then(res=>{
                            this.$Message.success(res);
                            this.$router.push({
                                name: 'Login'
                            })
                        }).catch(res=>{
                            this.$Message.error(res);
                        });
                    break;
                }
            },
            handleSubmit () {
                this.$refs['passwordForm'].validate(valid=>{
                    if (valid) {
                        this.$http.post('/user/update_password',{
                            oldpassword: this.oldpassword,
                            newpassword: this.newpassword
                        }).then(res=>{
                            if(res.code === 200){
                                this.$Message.success(res.msg);
                                this.modalState = false;
                            }else{
                                this.$Message.error(res.msg);
                            }
                        }).catch(e=>{
                            throw new Error(e)
                        })
                    }                 
                })
            },
            handleCancel () {
                this.$refs['passwordForm'].resetFields();
                this.modalState = false;
            } 
        }
    }
</script>