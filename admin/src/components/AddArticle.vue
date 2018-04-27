<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		{{title}}
      	</Col>
      </Row>
      <Form class="text-left" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
	        <FormItem label="标题" prop="title">
	            <Input style="width: 300px;" v-model="formValidate.title" placeholder="文章标题"></Input>
	        </FormItem>
	        <FormItem label="文章简介">
	            <Input style="width: 300px;" v-model="formValidate.desc" placeholder="文章简介"></Input>
	        </FormItem>
	        <FormItem label="关键字">
	            <Input style="width: 300px;" v-model="formValidate.keywords" placeholder="逗号分隔"></Input>
	        </FormItem>	
	        <FormItem label="作者">
	            <Input style="width: 300px;" v-model="formValidate.author" placeholder="作者"></Input>
	        </FormItem>	
	        <FormItem label="所属栏目">
	            <Cascader style="width: 300px;" :data="chanelList" v-model="formValidate.cid"></Cascader>
	        </FormItem>	
	        <FormItem label="类型">
	            <Select style="width: 300px;" v-model="formValidate.tid" placeholder="选择类型">
	            	<Option v-for="(el,index) in articleTypeList" :key="index" :value="el.id">{{el.name}}</Option>
	            </Select>
	        </FormItem>		        
	        <FormItem label="来源">
	            <RadioGroup v-model="formValidate.source">
	                <Radio label="原创">原创</Radio>
	                <Radio label="转载">转载</Radio>
	            </RadioGroup>
	        </FormItem>
	        <FormItem label="标签">
	            <CheckboxGroup v-model="formValidate.tags">
	                <Checkbox label="Eat"></Checkbox>
	                <Checkbox label="Sleep"></Checkbox>
	                <Checkbox label="Run"></Checkbox>
	                <Checkbox label="Movie"></Checkbox>
	            </CheckboxGroup>
	        </FormItem>
	        <FormItem label="禁用">
	            <i-switch v-model="formValidate.flag"></i-switch>
	        </FormItem>
	        <FormItem label="缩略图">
			    <Upload
			    	style="width: 300px"
			        type="drag"
			        :with-credentials="true"
			        :on-success="uploadSuccess"
			        action="/api/upload/qnupload">
			        <div v-if="formValidate.img" class="text-center upload-show-img">
			        	<img :src="formValidate.img" alt="" width="100px" height="100px"/>
			        </div>
			        <div style="padding: 20px 0;" v-else>
			            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
			            <p>点击或者拖拽上传</p>
			        </div>
			    </Upload>						 
	        </FormItem>	
	        <FormItem label="文章内容">
			    <vue-editor id="editor"
			      useCustomImageHandler
			      @imageAdded="handleImageAdded" v-model="formValidate.content">
			    </vue-editor>	        	
	        </FormItem>
	        <FormItem>
	            <Button :loading="btnLoading" type="success" @click="handleSubmit('formValidate')">发布</Button>
	            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
	        </FormItem>
            <Spin fix v-if="loading">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </Spin>		        
      </Form>
  </Card>
</template>

<script>
	import { VueEditor } from 'vue2-editor'
	export default {
		name: 'AddArticle',
		data () {
			return {
				formValidate: {
                    title: '',
                    desc: '',
                    keywords: '',
                    author: '',
                    source: '原创',
                    tags: [],
                    flag: false,
                    img: '',
                    content: '',
                    cid: [],
                    tid: ''
				},
				ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]					
				},
				url: '/article/save_article',
				loading: false,
				btnLoading: false,
				chanelList: [],
				articleTypeList: []
			}
		},
		computed: {
			title () {
				return this.formValidate.id ? '编辑文章' : '发布文章';
			}
		},
		methods: {
			uploadSuccess (response,file,fileList) {
				if(response.code === 200){
					this.formValidate.img = response.path;
				}else{
					this.$Message.error('文件上传失败');
				}
			},	
            handleReset (name) {
                this.$refs[name].resetFields();
            },			
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                     	let d = JSON.parse(JSON.stringify(this.formValidate));
                     	d.flag = d.flag ? 0 : 1;
                     	d.tags = d.tags.join(',');
                     	this.btnLoading = true;
                     	this.$http.post(this.url,d).then(res=>{
                     		if(res.code === 200){
                     			this.$Message.success(res.msg);
                     			this.$router.push({
                     				name: 'ArticleList'
                     			})
                     		}else{
                     			this.$Message.error(res.msg);
                     		}
                     	}).catch(e=>{
                     		throw new Error(e)
                     	}).complete(()=>{
                     		this.btnLoading = false;
                     	})
                    }
                })
            },
		    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
		        let formData = new FormData();
		        formData.append('image', file);
		        this.$http.post('/upload/fileupload',formData)
		        .then((result) => {
		          let url = result.data.url;
		          Editor.insertEmbed(cursorLocation, 'image', url);
		          resetUploader();
		        })
		        .catch((err) => {
		          console.log(err);
		        })
		    }            
		},
		mounted () {
			let query = this.$route.query;
			let parr = [];
			parr.push(this.$http.post('/chanel/chanel_list_tree'));
			parr.push(this.$http.post('/article/list_article_type'));
			if(query.id){
				this.url = '/article/update_article';
				parr.push(this.$http.post('/article/get_article',{
					id: query.id
				}))
			}
			this.loading = true;
			Promise.all(parr).then(res=>{
				let a = res[0],b = res[1],c = res[2] || null;
				if(a.code === 200){
					this.chanelList = a.data;
				}
				if(b.code === 200){
					this.articleTypeList = b.data;
				}
				if(c){
					if(c.code === 200){
						let d = c.data;
						d.flag = d.flag === 1 ? false : true;
						d.tags = d.tags ? d.tags.split(',') : [];
						Object.assign(this.formValidate,d);
					}					
				}
			}).catch(e=>{
				throw new Error(e)
			}).complete(()=>{
				this.loading = false;
			})
		},
		components: {
			VueEditor
		}
	}
</script>

<style>
</style>