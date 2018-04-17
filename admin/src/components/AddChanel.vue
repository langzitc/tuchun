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
			        <FormItem label="栏目类型" prop="tid">
			            <Select size="large" v-model="formValidate.tid">
			            	<Option v-for="(el,index) in chanelTypeList" :value="el.id">{{el.name}}</Option>
			            </Select>
			        </FormItem>		
			        <FormItem label="父级栏目">
			            <Select size="large" v-model="formValidate.pid">
			            	<Option value="index.ejs">index.ejs</Option>
			            </Select>
			        </FormItem>					        
			        <FormItem label="栏目模板" prop="chanel_template">
			            <Select size="large" v-model="formValidate.chanel_template">
			            	<Option value="index.ejs">index.ejs</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="列表模板">
			            <Select size="large" v-model="formValidate.list_template">
			            	<Option value="index.ejs">index.ejs</Option>
			            </Select>
			        </FormItem>		
			        <FormItem label="文章模板">
			            <Select size="large" v-model="formValidate.art_template">
			            	<Option value="index.ejs">index.ejs</Option>
			            </Select>
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
					        action="http://localhost:4000/api/upload/fileupload">
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
                formValidate: {
                    name: '',
                    chanel_template: '',
                    list_template: '',
                    art_template: '',
                    flag: false,
                    title: '',
                    desc: '',
                    keywords: '',
                    img: '',
                    pid: 0,
                    tid: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '栏目名称不能为空', trigger: 'blur' }
                    ],
                    tid: [
                        { required: true, message: '栏目类型不能为空', trigger: 'change' }
                    ],                    
                    chanel_template: [
                        { required: true, message: '栏目模板不能为空', trigger: 'change' },
                    ]
                }				
			}
		},
	    computed: {
	    	...mapState({
	    		chanelTypeList: state => state.chanelTypeList
	    	})
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
                        this.$Message.success('Success!');
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