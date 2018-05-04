<template>
    <Modal
        v-model="status"
        :title="title"
        :loading="status"
	>
			<div slot="footer">
				<Button type="ghost" @click="cancel">取消</Button>
				<Button type="primary" @click="save" :loading="btnLoading">添加</Button>
			</div>
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		        <FormItem label="手机号" prop="tel">
		            <Input v-model="formValidate.tel" placeholder="请输入手机号"></Input>
		        </FormItem>
		        <FormItem label="邮箱" prop="email">
		            <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
		        </FormItem>
		        <FormItem label="密码" prop="password">
		            <Input v-model="formValidate.password" placeholder="请输入密码" type="password"></Input>
		        </FormItem>	
		        <FormItem label="昵称">
		            <Input v-model="formValidate.nick" placeholder="请输入昵称"></Input>
		        </FormItem>
		        <FormItem label="微信">
		            <Input v-model="formValidate.weixin" placeholder="请输入微信"></Input>
		        </FormItem>
		        <FormItem label="QQ">
		            <Input v-model="formValidate.qq" placeholder="请输入QQ"></Input>
		        </FormItem>
		        <FormItem label="头像">
				    <Upload
				        type="drag"
				        :with-credentials="true"
				        :on-success="uploadSuccess"
				        :action="uploadAction">
				        <div v-if="formValidate.avastar" class="text-center upload-show-img">
				        	<img :src="formValidate.avastar" alt="" width="100px" height="100px"/>
				        </div>
				        <div style="padding: 20px 0;" v-else>
				            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
				            <p>点击或者拖拽上传</p>
				        </div>
				    </Upload>		        	
		        </FormItem>		        
		    </Form>
    </Modal>	
</template>

<script>
	export default {
		name: 'user-form',
		data () {
            return {
                formValidate: {
                    tel: '',
                    email: '',
                    password: '',
                    nick: '',
                    avastar: '',
                    weixin: '',
                    qq: ''
                },
                ruleValidate: {
                    tel: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                status: false,
                btnLoading: false
            }			
		},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '添加用户'
			},
			data: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		watch: {
			value (v) {
				this.status = v;
			},
			data (v) {
				Object.assign(this.formValidate,v);
			},
			status (v) {
				this.$emit('input', v);
			}
		},
		computed: {
			uploadAction () {
				return API_PATH+"/upload/qnupload";
			}
		},
		methods: {
			save () {
				this.$refs['formValidate'].validate(valid=>{
					if(valid){
						this.btnLoading = true;
						let url = this.data.id ? '/user/update_user' : '/user/save_user';
						this.$http.post(url,this.formValidate).then(res=>{
							if(res.code === 200){
								this.$Message.success(res.msg);
								this.$emit('on-save');
								this.status = false;
							}else{
								this.$Message.error(res.msg);
							}
						}).catch(e=>{
							this.$Message.error(e);
						}).complete(()=>{
							this.btnLoading = false;
						})
					}else{
						console.log('表单验证失败')
					}
				})
			},
			uploadSuccess (response,file,fileList) {
				if(response.code === 200){
					this.formValidate.avastar = response.path;
				}else{
					this.$Message.error('文件上传失败');
				}
			},
			cancel () {
				this.status = false;
			}
		},
		mounted () {
			Object.assign(this.formValidate,this.data);
		}
	}
</script>

<style lang="less">

</style>