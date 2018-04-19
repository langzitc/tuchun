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
		        <FormItem label="上级分类" prop="path">
		            <Cascader :data="parent" v-model="formValidate.pid" :disabled="isDisabled"></Cascader>
		        </FormItem>
		        <FormItem label="名称" prop="name">
		            <Input v-model="formValidate.name" placeholder="名称"></Input>
		        </FormItem>		              
		    </Form>
    </Modal>	
</template>

<script>
	import { GetTreeLine } from '../../Until'
	export default {
		name: 'add-classic-form',
		data () {
            return {
                formValidate: {
                    name: '',
                    pid: [0],
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
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
				default: '添加分类'
			},
			data: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			classicList () {
				return this.$store.state.classicList;
			},
			parent () {
				return [{
					label: '根类型',
					value: 0,
					children: this.classicList
				}];
			},
			isDisabled () {
				return this.data.id ? true :false;
			}
		},
		watch: {
			value (v) {
				this.status = v;
			},
			data: {
				deep: true,
				handler (v){
					if(v){
						let d = JSON.parse(JSON.stringify(v));
						d.pid = GetTreeLine([{
							value: 0,
							pid: -1,
							children: this.classicList
						}],d.pid,'value');						
						Object.assign(this.formValidate,d);	
					}		
				}
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
						let url = this.data.name ? '/classic/update_classic' : '/classic/save_classic';
						let d = JSON.parse(JSON.stringify(this.formValidate));
						d.pid = d.pid[d.pid.length-1];
						this.$http.post(url,d).then(res=>{
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
			let d = JSON.parse(JSON.stringify(this.data));
			d.pid = GetTreeLine([{
				value: 0,
				pid: -1,
				children: this.classicList
			}],d.pid,'value');
			Object.assign(this.formValidate,d);
		}
	}
</script>

<style lang="less">

</style>