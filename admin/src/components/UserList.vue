<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		用户列表
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="success" @click="addUser = true">添加用户</Button>
      		<user-form v-model="addUser" @on-save="loadData"></user-form>
      		<user-form v-model="editUser" :data="selectUser" title="编辑用户" @on-save="loadData"></user-form>
      	</Col>
      </Row>
      <div>
          <Table :loading="loading" :data="data" :columns="columns"></Table>
          <Page @on-change="pageChange" :total="total" :page-size="pageSize" :current="page" style="margin-top:20px"></Page>
      </div>
  </Card>
</template>
<script>
import UserForm from './UserForm'	
let _this = null;
export default {
    name: 'UserList',
    data () {
        return {
            columns: [{
                title: '手机号',
                key: 'tel'
            },{
                title: '邮箱',
                key: 'email'
            },{
                title: '微信',
                key: 'weixin'
            },{
                title: 'QQ',
                key: 'qq'
            },{
                title: '头像',
                align: 'center',
                render (h, r) {
                	return h('img',{
                		attrs: {
                			src: r.row.avastar
                		},
                		style: {
                			width: '30px',
                			height: '30px',
                			borderRadius: '50%'
                		}
                	})
                }
            },{
                title: '角色',
                render (h,r) {
                	return h('span',r.row.role.name);
                }
            },{
                title: '昵称',
                key: 'nick'
            },{
                title: '状态',
                render (h,r) {
                	return h('span',r.row.flag === 1 ? '可用' : '禁用')
                }
            },{
            		title: '操作',
            		render (h,r){
            			return h('span',[
            				h('Button',{
            					props: {
            						type: 'info',
            						size: 'small'
            					},
            					on: {
            						'click' () {
            							_this.selectUser = JSON.parse(JSON.stringify(r.row));
            							_this.editUser = true;
            						}
            					}
            				},'编辑'),
            				h('Button',{
            					props: {
            						type: 'error',
            						size: 'small'
            					},
            					on: {
            						'click' () {
														_this.$Modal.confirm({
															title: '提示',
															content: '确认删除?',
															onOk: ()=>{
		            								_this.$http.post("/user/del_user",{id:r.row.id}).then(res=>{
		            									if(res.code === 200){
		            										_this.$Message.success(res.msg);
		            										_this.loadData();
		            									}else{
		            										_this.$Message.error(res.msg);
		            									}
		            								}).catch(e=>{
		            									_this.$Message.error('删除失败');
		            								})
															}
														})
            						}
            					}
            				},'删除')            				
            			])
            		}
            }],
            data: [],
            loading: false,
            total: 0,
            pageSize: 15,
            page: 1,
            addUser: false,
            editUser: false,
            selectUser: {}
        }
    },
    watch: {
        page () {
            this.loadData();
        }
    },
    methods: {
        loadData () {
            this.loading = true;
            this.$http.post('/user/list_user',{
                pageSize: this.pageSize,
                page: this.page
            }).then(res=>{
                this.data = res.data.rows;
                this.total = res.data.count;
            }).catch(e=>{
                this.$Message.error("获取用户列表失败");
                throw new Error(e);
            }).complete(()=>{
                this.loading = false;
            })
        },
        pageChange (p) {
            this.page = p;
        }
    },
    mounted () {
				this.loadData();
				_this = this;
    },
    components: {
    	UserForm
    }
}
</script>
<style lang="less">

</style>

