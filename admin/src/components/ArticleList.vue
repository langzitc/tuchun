<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		文章列表
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="success" @click="goPubArticle">添加文章</Button>
      	</Col>
      </Row>
      <div>
          <Table :loading="loading" :data="data" :columns="columns"></Table>
          <Page @on-change="pageChange" :total="total" :page-size="pageSize" :current="page" style="margin-top:20px"></Page>
      </div>
  </Card>	
</template>

<script>
	let _this;
	export default {
		name: 'ArticleList',
		data () {
			return {
	            columns: [{
	                title: 'ID',
					type: 'index',
					key: 'id'
	            },{
	                title: '标题',
	                key: 'title'
	            },{
	                title: '作者',
	                key: 'author'
	            },{
	                title: '状态',
	                render (h,r){
	                	return h('span',r.row.flag === 1 ? '可用' : '禁用');
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
											_this.$router.push({
												name: 'AddChanel',
												query: {
													id: r.row.id
												}
											})
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
		            								_this.$http.post("/article/del_article",{id:r.row.id}).then(res=>{
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
	            this.$http.post('/article/list_article',{
	                pageSize: this.pageSize,
	                page: this.page
	            }).then(res=>{
	                this.data = res.data.rows;
	                this.total = res.data.count;
	            }).catch(e=>{
	                this.$Message.error("获取文章列表失败");
	                throw new Error(e);
	            }).complete(()=>{
	                this.loading = false;
	            })
	        },
	        pageChange (p) {
	            this.page = p;
	        },
	        goPubArticle () {
	        	this.$router.push({
	        		name: 'AddArticle'
	        	})
	        }
	    },
	    mounted () {
			this.loadData();
			_this = this;
	    }		
	}
</script>

<style>
</style>