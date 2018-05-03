<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		文章类型列表
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="success" @click="addType = true">添加类型</Button>
      		<article-type-form v-model="addType" @on-save="loadData"></article-type-form>
      		<article-type-form v-model="editType" :data="selectType" title="编辑类型" @on-save="loadData"></article-type-form>
      	</Col>
      </Row>
      <div>
          <Table :loading="loading" :data="data" :columns="columns"></Table>
      </div>
  </Card>
</template>
<script>
import ArticleTypeForm from './common/ArticleTypeForm'	
import { mapState } from 'vuex'
let _this = null;
export default {
    name: 'ArticleType',
    data () {
        return {
            columns: [{
                title: '名称',
                key: 'name'
            },{
                title: '描述',
                key: 'desc'
            },{
        		title: '操作',
        		align: 'right',
        		render (h,r){
        			return h('span',[
        				h('Button',{
        					props: {
        						type: 'info',
        						size: 'small'
        					},
        					on: {
        						'click' () {
        							_this.selectType = JSON.parse(JSON.stringify(r.row));
        							_this.editType = true;
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
	            							_this.$http.post("/article/del_article_type",{id:r.row.id}).then(res=>{
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
            loading: false,
            addType: false,
            editType: false,
            selectType: {}
        }
    },
    computed: {
    	...mapState({
    		data: state => state.articleTypeList
    	})
    },
    methods: {
        loadData () {
            this.loading = true;
            this.$store.dispatch("getArticleType").then(res=>{
            	return true;
            }).catch(msg=>{
            	this.$Message.error(msg);
            }).complete(()=>{
            	this.loading = false;
            })
        }
    },
    mounted () {
		this.loadData();
		_this = this;
    },
    components: {
    	ArticleTypeForm
    }
}
</script>
<style lang="less">

</style>

