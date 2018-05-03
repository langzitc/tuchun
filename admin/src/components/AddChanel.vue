<template>
	  <Card>
	      <Row slot="title">
	      	<Col :span="12" class="text-left">
	      		添加栏目
	      	</Col>
	      	<Col :span="12" class="text-right">
	      		<Button type="ghost" @click="back">返回</Button>
	      	</Col>
	      </Row>
	      <div class="text-left">
			    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width: 600px;margin: 50px auto;">
			        <FormItem label="栏目名称" prop="name">
			            <Input size="large" v-model="formValidate.name" placeholder="栏目名称"></Input>
			        </FormItem>
			        <FormItem label="栏目类型" prop="cid">
			            <Select size="large" v-model="formValidate.cid">
			            	<Option v-for="(el,index) in chanelTypeList" :key="index" :value="el.id">{{el.name}}</Option>
			            </Select>
			        </FormItem>		
			        <FormItem label="父级栏目">
			            <Cascader :data="chanel" v-model="formValidate.pid"></Cascader>
			        </FormItem>					        
			        <FormItem label="栏目模板">
			            <Cascader :data="tempList" v-model="formValidate.chanel_template"></Cascader>
			        </FormItem>
			        <FormItem label="列表模板">
			            <Cascader :data="tempList" v-model="formValidate.list_template"></Cascader>
			        </FormItem>		
			        <FormItem label="文章模板">
			            <Cascader :data="tempList" v-model="formValidate.art_template"></Cascader>
			        </FormItem>	
			        <FormItem label="禁用栏目">
						 <i-switch v-model="formValidate.flag"></i-switch>
			        </FormItem>	
			        <FormItem label="SEO标题">
						 <Input size="large" v-model="formValidate.title" placeholder="标题"></Input>
			        </FormItem>	
			        <FormItem label="SEO描述">
						 <Input size="large" v-model="formValidate.desc" placeholder="描述"></Input>
			        </FormItem>	
			        <FormItem label="SEO关键词">
						 <Input size="large" v-model="formValidate.keywords" placeholder="关键词"></Input>
			        </FormItem>		
			        <FormItem label="栏目缩略图">
					    <Upload
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
			        <FormItem>
			            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
			        </FormItem>
			    </Form>		
	      </div>
	  </Card>	
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'AddChanel',
		data () {
			return {
				url: '/chanel/save_chanel',
        formValidate: {
            name: '',
            chanel_template: [],
            list_template: [],
            art_template: [],
            flag: false,
            title: '',
            desc: '',
            keywords: '',
            img: '',
            pid: [0],
            cid: ''
        },
        ruleValidate: {
            name: [
                { required: true, message: '栏目名称不能为空', trigger: 'blur' }
            ],
            cid: [
                { required: true,type: 'number', message: '栏目类型不能为空', trigger: 'change' }
            ]                   
        }				
			}
		},
    computed: {
    	chanel () {
    		return [{
    			value: 0,
    			pid: 0,
    			label: '根栏目',
    			children: this.$store.state.chanelTreeList
    		}]
    	},
    	tempList () {
    		let tl = this.$store.state.templateList;
    		let f = (arr)=>{
    			let a = [];
    			arr.forEach(e=>{
    				let obj = {};
					  obj.label = e.name;
					  obj.value = e.path;    				
    				if(e.children&&e.children.length){
    					obj.children = f(e.children);
    				}
    				a.push(obj);
    			})
    			return a;
    		}
    		return f(tl)
    	},
    	...mapState({
    		chanelTypeList: state => state.chanelTypeList
    	})
    },	
    mounted () {
    	if(!this.chanelTypeList.length){
    		this.$store.dispatch('getChanelType');
    	}
    	if(!this.$store.state.chanelTreeList.length){
    		this.$store.dispatch('getChanelTreeList');
    	}
    	if(!this.$store.state.templateList.length){
    		this.$store.dispatch('getTemplateList');
    	}  
    	let queryData = JSON.parse(JSON.stringify(this.$route.query));
    	if(queryData.id){
    		this.url = '/chanel/update_chanel';
    	}
    	queryData.flag = queryData.flag === 0  ? true : false;
    	queryData.chanel_template = queryData.chanel_template ? [queryData.chanel_template] : [];
    	queryData.list_template = queryData.list_template ? [queryData.list_template] : [];
    	queryData.art_template = queryData.art_template ? [queryData.art_template] : [];
    	queryData.cid = queryData.chanelType ? queryData.chanelType.id : 0;
    	queryData.pid = [queryData.pid];
    	Object.assign(this.formValidate,queryData);
    },
		methods: {
			back () {
				this.$router.go(-1);
			},
			uploadSuccess (response,file,fileList) {
				if(response.code === 200){
					this.formValidate.img = response.path;
				}else{
					this.$Message.error('文件上传失败');
				}
			},			
	    handleSubmit (name) {
	        this.$refs[name].validate((valid) => {
	            if (valid) {
	            		let d = JSON.parse(JSON.stringify(this.formValidate));
	            		d.chanel_template = d.chanel_template.length ? d.chanel_template[d.chanel_template.length-1] : '';
	            		d.list_template = d.list_template.length ? d.list_template[d.list_template.length-1] : '';
	            		d.art_template = d.art_template.length ? d.art_template[d.art_template.length-1] : '';
	            		d.pid = d.pid.length ? d.pid[d.pid.length-1] : '';
	            		d.flag = d.flag ? 0 : 1;
	                this.$http.post(this.url,d).then(res=>{
	                	if(res.code === 200){
	                		this.$Message.success(res.msg);
	                		this.$router.push({
	                			name: 'ChanelList'
	                		})
	                	}else{
	                		this.$Message.error(res.msg);
	                	}
	                })
	            } else {
	                this.$Message.error('Fail!');
	            }
	        })
	    }		
		}
	}
</script>

<style>
</style>