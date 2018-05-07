<template> 
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		相册管理
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="warning" @click="delPicture" :disabled="pid === ''">删除相册</Button>
      	</Col>
      </Row>
      <div class="text-left">
          <Table :loading="loading" :columns="columns" :data="data"></Table>
          <Page @on-change="pageChange" :total="total" :page-size="pageSize" :current="page" style="margin-top:20px"></Page>
      </div>
  </Card>	
</template>
<script>
    export default {
        name: 'PictureList',
        data () {
            return {
                data: [],
                pid: '',
                loading: false,
                pageSize: 10,
                page: 1,
                total: 0,
                columns: []
            }
        },
        methods: {
            loadData () {
                this.loading = true;
                this.$http.post('/public/list_picture',{
                    pageSize: this.pageSize,
                    page: this.page
                }).then(res=>{
                    this.data = res.data.rows;
                    this.total = res.data.count;
                }).catch(e=>{
                    this.$Message.error("获取相册列表失败");
                    throw new Error(e);
                }).complete(()=>{
                    this.loading = false;
                })
            },
            pageChange (p) {
                this.page = p;
            },            
            delPicture () {

            }
        },
        mounted () {
            this.loadData();
        }
    }
</script>
<style lang="less">
    
</style>