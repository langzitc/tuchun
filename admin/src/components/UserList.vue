<template>
  <Card>
      <h5 slot="title">用户列表</h5>
      <div>
          <Table :loading="loading" :data="data" :columns="columns"></Table>
          <Page @on-change="pageChange" :total="total" :page-size="pageSize" :current="page" style="margin-top:20px"></Page>
      </div>
  </Card>
</template>
<script>
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
                key: 'avatar'
            },{
                title: '角色',
                key: 'role'
            },{
                title: '昵称',
                key: 'nicheng'
            },{
                title: '状态',
                render (h,r) {
                	return h('span',r.row.flag === 1 ? '可用' : '禁用')
                }
            }],
            data: [],
            loading: false,
            total: 0,
            pageSize: 15,
            page: 1
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
                this.data = res.data;
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
    }
}
</script>
<style lang="less">

</style>

