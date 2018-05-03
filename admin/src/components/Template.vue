<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		模板列表
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="success" @click="addTemplate = true">添加模板</Button>
      		<template-form v-model="addTemplate" @on-save="loadData"></template-form>
      		<template-form v-model="editTemplate" :data="selectTemplate" title="编辑模板" @on-save="loadData"></template-form>
      	</Col>
      </Row>
      <div class="text-left">
          <Tree :data="data" :render="renderContent"></Tree>
      </div>
  </Card>	
</template>

<script>
	import TemplateForm from './common/TemplateForm'
	import { mapState } from 'vuex'
	export default {
		name: 'Template',
		data () {
			return {
				addTemplate: false,
				editTemplate: false,
				selectTemplate: {},
				buttonProps: {
					type: 'ghost',
					size: 'small'
				}
			}
		},
		computed: {
			...mapState({
				data: state => state.templateList
			})
		},
		components: {
			TemplateForm
		},
		methods: {
			loadData () {
				this.$store.dispatch('getTemplateList').then(()=>{
					this.data.sort((a,b)=>{
						return b.isDirectory;
					})
				});
			},
	    renderContent (h, { root, node, data }) {
	    	let btnArr = [];
				btnArr.push(
        h('Button', {
            props: Object.assign({}, this.buttonProps, {
                icon: 'ios-minus-empty'
            }),
            class: {
            	treeBtn: true
            },            
		        style: {
		            marginRight: '8px'
		        },            
            on: {
                click: () => { this.remove(root, node, data) }
            }
        })						
				)	    	
	    	if(data.children&&data.children.length){
						btnArr.push(
	            h('Button', {
	                props: Object.assign({}, this.buttonProps, {
	                    icon: 'ios-plus-empty'
	                }),
	                class: {
	                	treeBtn: true
	                },
	                on: {
	                    click: () => { this.append(data) }
	                }
	            })						
						)
	    	}else{
	    		btnArr.push(
		        h('Button', {
		            props: Object.assign({}, this.buttonProps, {
		                icon: 'edit'
		            }),
                class: {
                	treeBtn: true
                },		            
		            on: {
		                click: () => { this.edit(root, node, data) }
		            }
		        })            			
	    		)
	    	}
	        return h('span', {
            style: {
                display: 'inline-block',
                width: '100%'
            }
	        }, [
            h('span', [
	            h('Icon', {
	                props: {
	                    type: data.children&&data.children.length ? 'folder' : 'document-text',
	                    size: 18
	                },
	                style: {
	                    marginRight: '8px'
	                }
	            }),
	            h('span', data.name)
            ]),
            h('span', {
	            style: {
	                display: 'inline-block',
	                float: 'right',
	                marginRight: '15px'
	            }
            }, btnArr)
	        ]);
	    },
	    append (data) {
					this.addTemplate = true;
	    },
	    remove (root, node, data) {
					this.$Modal.confirm({
						title: '系统提示',
						content: '确认删除?',
						onOk: ()=>{
							this.$http.post("/template/del_template",{
								path: data.path
							}).then(res=>{
								if(res.code === 200){
									this.$Message.success(res.msg);
									this.loadData();
								}else{
									this.$Message.error(res.msg);
								}
							})
						}
					});
	    },
	    edit (root, node, data) {
	    		this.selectTemplate = JSON.parse(JSON.stringify(data));
					this.editTemplate = true;
	    }	            
		},
		mounted () {
			this.loadData();
		}
	}
</script>

<style lang="less">
	.treeBtn{
		width: 25px;
		height: 25px;
	}
</style>