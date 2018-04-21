<template>
    <Modal
        v-model="status"
        :title="title"
        :loading="status"
        class-name="modal-scroll"
        :mask-closable="false"
        :scrollable="false"
	>
			<div slot="footer">
				<Button type="ghost" @click="cancel">取消</Button>
				<Button type="primary" @click="save" :loading="btnLoading">添加</Button>
			</div>
		    <Form ref="formValidate" :model="formValidate" :label-width="80">
		        <FormItem label="任务名">
		            <Input v-model="formValidate.taskName" placeholder="请输入任务名"></Input>
		        </FormItem>
		        <FormItem label="URL">
		            <Row>
		            	<Col v-for="(el,index) in formValidate.uri" :key="index">
		            		<Input v-model="formValidate.uri[index]" placeholder="请输入URL"></Input>
		            	</Col>
		            	<Col class="text-left">
		            		<Button icon="plus-round" @click="uriAdd"></Button>
		            		<Button icon="minus-round" @click="uriRemove"></Button>
		            	</Col>
		            </Row>
		        </FormItem>		
		        <FormItem label="列表规则">
		            <Input v-model="formValidate.listRule"></Input>
		        </FormItem>	
		        <FormItem label="标题">
		            <Input v-model="formValidate.listTitle"></Input>
		        </FormItem>	
		        <FormItem label="时间">
		            <Input v-model="formValidate.listTime"></Input>
		        </FormItem>	
		        <FormItem label="内容URI规则">
		            <Input v-model="formValidate.listUri"></Input>
		        </FormItem>	
		        <FormItem label="描述">
		            <Input v-model="formValidate.listDesc"></Input>
		        </FormItem>	
		        <FormItem label="列表规则">
		            <Input v-model="formValidate.listRule"></Input>
		        </FormItem>	
		        <FormItem label="缩略图规则">
		            <Input v-model="formValidate.listImg"></Input>
		        </FormItem>	
		        <FormItem label="内容规则">
		            <Input v-model="formValidate.content"></Input>
		        </FormItem>	
		        <FormItem label="自动采集">
		            <iSwitch v-model="formValidate.isAuto"></iSwitch>
		        </FormItem>	
		        <FormItem label="采集时间">
		            <Row>
		            	<Col :span="4">
		            		<InputNumber v-model="formValidate.year"></InputNumber>
		            	</Col>
		            	<Col :span="4">
		            		<InputNumber v-model="formValidate.week"></InputNumber>
		            	</Col>
		            	<Col :span="4">
		            		<InputNumber v-model="formValidate.day"></InputNumber>
		            	</Col>
		            	<Col :span="4">
		            		<InputNumber v-model="formValidate.hour"></InputNumber>
		            	</Col>
		            	<Col :span="4">
		            		<InputNumber v-model="formValidate.minute"></InputNumber>
		            	</Col>	
		            	<Col :span="4">
		            		<InputNumber v-model="formValidate.second"></InputNumber>
		            	</Col>			            	
		            </Row>
		        </FormItem>				        
		        <FormItem label="自动导入">
		            <iSwitch v-model="formValidate.isAutoImport"></iSwitch>
		        </FormItem>	
		        <FormItem label="导入栏目">
					<Cascader @on-change="chanelChange" :transfer="true" :data="chanelList" v-model="chanel"></Cascader>
		        </FormItem>			        
		    </Form>
    </Modal>	
</template>

<script>
	import { GetTreeLine } from '../../Until'
	export default {
		name: 'task-form',
		data () {
            return {
            	chanel: [],
                formValidate: {
                    taskName: '',
                    uri: [],
                    listRule: '',
                    listTitle: '',
                    listTime: '',
                    listDesc: '',
                    listUri: '',
                    listImg: '',
                    content: '',
                    isAuto: false,
                    month: 0,
                    year: 0,
                    day: 0,
                    week: 0,
                    hour: 0,
                    minute: 0,
                    second: 0,
                    saveChanelId: 0,
                    chanelName: '',
                    isAutoImport: false
                },
                status: false,
                btnLoading: false
            }			
		},
		computed: {
			chanelList () {
	    		return this.$store.state.chanelTreeList;				
			}
		},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '添加任务'
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
				this.chanel = GetTreeLine(this.chanelList,v.saveChanelId,'value');				
				Object.assign(this.formValidate,v);
			},
			status (v) {
				this.$emit('input', v);
			}
		},
		methods: {
			save () {
				this.btnLoading = true;
				this.$http.post("/crawler/save_task",this.formValidate).then(res=>{
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
			},
			cancel () {
				this.status = false;
			},
			uriAdd () {
				this.formValidate.uri.push('');
			},
			uriRemove () {
				this.formValidate.uri.pop();
			},
			chanelChange (value, selectData) {
				let v = selectData[selectData.length-1].value;
				let l = selectData[selectData.length-1].label;
				this.formValidate.saveChanelId = v;
				this.formValidate.chanelName = l;
			}
		},
		mounted () {
			Object.assign(this.formValidate,this.data);
	    	if(!this.$store.state.chanelList.length){
	    		this.$store.dispatch('getChanelTreeList');
	    	}			
		}
	}
</script>

<style lang="less">

</style>