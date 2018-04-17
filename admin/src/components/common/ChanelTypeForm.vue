<template>
    <Modal
        v-model="status"
        :title="title"
        :loading="status"
	>
			<div slot="footer">
				<Button type="ghost" @click="cancel">取消</Button>
				<Button type="primary" @click="save" :loading="btnLoading">保存</Button>
			</div>
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		        <FormItem label="类型名称" prop="name">
		            <Input v-model="formValidate.name" placeholder="类型名称"></Input>
		        </FormItem>
		        <FormItem label="描述" prop="desc">
		            <Input v-model="formValidate.desc" placeholder="描述"></Input>
		        </FormItem>       
		    </Form>
    </Modal>	
</template>

<script>
	export default {
		name: 'chanel-type-form',
		data () {
            return {
                formValidate: {
                    name: '',
                    desc: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '类型名称不能为空', trigger: 'blur' }
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
				default: '添加类型'
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
						let url = this.data.id ? '/chanel/update_chanel_type' : '/chanel/save_chanel_type';
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