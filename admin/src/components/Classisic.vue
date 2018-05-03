<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		分类管理
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="success" @click="addClassic = true">添加分类</Button>
      		<add-classic-form v-model="addClassic" :data="selectClassic2" @on-save="loadData"></add-classic-form>
      		<add-classic-form v-model="editClassic" :data="selectClassic" title="编辑分类" @on-save="loadData"></add-classic-form>
      	</Col>
      </Row>
      <div class="text-left">
          <Tree :data="data" :render="renderContent"></Tree>
      </div>
  </Card>	
</template>
<script>
	import AddClassicForm from './common/AddClassicForm'	
	import { mapState } from 'vuex'
	export default {
		name: 'Template',
		data () {
			return {
				addClassic: false,
				editClassic: false,
				selectClassic: {},
				selectClassic2: {},
				buttonProps: {
					type: 'ghost',
					size: 'small'
				}
			}
		},
		computed: {
			...mapState({
				data: state => state.classicList
			})
		},
		components: {
			AddClassicForm
		},
		methods: {
			loadData () {
				this.$store.dispatch('getClassicList');
			},
	    renderContent (h, { root, node, data }) {
		    	let btnArr = [
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
	            }),
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
			        }),
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
		    	];
	        return h('span', {
            style: {
                display: 'inline-block',
                width: '100%'
            }
	        }, [
            h('span', [
	            h('Icon', {
	                props: {
	                    type: data.children&&data.children.length ? 'navicon' : 'filing',
	                    size: 18
	                },
	                style: {
	                    marginRight: '8px'
	                }
	            }),
	            h('span', data.label)
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
					this.addClassic = true;
					this.selectClassic2 = {
						pid: data.value
					}
	    },
	    remove (root, node, data) {
					this.$Modal.confirm({
						title: '系统提示',
						content: '确认删除?',
						onOk: ()=>{
							this.$http.post("/classic/del_classic",{
								path: data.value
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
	    		this.selectClassic = {
	    			id: data.value,
	    			name: data.label,
	    			pid: node.node.pid
	    		};
					this.editClassic = true;
	    }	            
		},
		mounted () {
			this.loadData();
		}
	}
</script>
<style lang="less">

</style>

