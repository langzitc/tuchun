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
				this.$store.dispatch('getTemplateList');
			},
            renderContent (h, { root, node, data }) {
            	let btnArr = [];
            	if(data.children&&data.children.length){
					btnArr.push(
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        })						
					)
					btnArr.push(
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })						
					)
            	}else{
            		btnArr.push(
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'edit'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
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
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }			
		},
		mounted () {
			this.loadData();
		}
	}
</script>

<style>
</style>