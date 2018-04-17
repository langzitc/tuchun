<template>
    <Modal
        v-model="status"
        :title="title"
        :loading="status"
        width="600px"
	>
			<div slot="footer">
				<Button type="ghost" @click="cancel">取消</Button>
				<Button type="primary" @click="save" :loading="btnLoading">保存</Button>
			</div>
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		        <FormItem label="模板目录" prop="path">
		            <Input v-model="formValidate.path" placeholder="模板目录"></Input>
		        </FormItem>
		        <FormItem label="模板名称" prop="name">
		            <Input v-model="formValidate.name" placeholder="模板名称"></Input>
		        </FormItem>		        
		        <FormItem label="模板内容" prop="content">
		            <Input :rows="8" type="textarea" v-model="formValidate.content" placeholder="模板内容"></Input>
		        </FormItem>       
		    </Form>
    </Modal>	
</template>

<script>
	export default {
		name: 'template-form',
		data () {
            return {
                formValidate: {
                    name: '',
                    path: '',
                    content: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '模板名称不能为空', trigger: 'blur' }
                    ],
                    path: [
                        { required: true, message: '模板路径不能为空', trigger: 'blur' }
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
				default: '添加模板'
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
		methods: {
			save () {
				this.$refs['formValidate'].validate(valid=>{
					if(valid){
						this.btnLoading = true;
						let url = this.data.id ? '/template/update_template' : '/template/save_template';
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