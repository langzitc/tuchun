<template>
	<div class="tree-wrap">
		<div class="tree-wrap-item" v-for="(el,index) in list" :key="index">
			<div class="tree-wrap-item-inner">
				<div class="tree-pre-ico" @click="expand(el)">
					<Icon type="minus" v-if="el.expand"></Icon>
					<Icon type="plus" v-else></Icon>
				</div>
				<Row>
					<Col :span="4">
						{{el.id}}
					</Col>
					<Col :span="4">
						{{el.name}}
					</Col>
					<Col :span="4">
						{{el.chanelType ? el.chanelType.name : ''}}
					</Col>
					<Col :span="4">
						{{el.flag === 1 ? '可用' : '禁用'}}
					</Col>
					<Col :span="8" class="text-right">
					    <ButtonGroup>
					        <Button @click="add(el)" type="ghost" size="small" icon="plus-circled"></Button>
					        <Button @click="del(el)" type="ghost" size="small" icon="close-circled"></Button>
					        <Button @click="edit(el)" type="ghost" size="small" icon="edit"></Button>
					    </ButtonGroup>					
					</Col>
				</Row>				
			</div>
			<div class="chidren-wrap" v-show="el.expand" v-if="el.children&&el.children.length">
				<chanel-tree :data="el.children"></chanel-tree>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'chanel-tree',
		data () {
			return {
				list: []
			}
		},
		props: {
			data: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		methods: {
			init () {
				let format = (arr) => {
					arr.map(el=>{
						el.expand = false;
						if(el.children&&el.children.length){
							el.children = format(el.children);
						}
						return el;
					})
					return arr;
				}
				this.list = format(JSON.parse(JSON.stringify(this.data)));
			},
			expand (el) {
				el.expand = !el.expand;
			},
			add (el) {
				this.$router.push({
					name: 'AddChanel',
					query: {
						pid: el.id
					}
				});
			},
			del (el) {
				this.$Modal.confirm({
					title: '系统提示',
					content: '确认删除?',
					onOk: ()=>{
						this.$http.post('/chanel/del_chanel',{
							id: el.id
						}).then(res=>{
							if(res.code === 200){
								this.$Message.success(res.msg);
								this.$store.dispatch('getChanelList');
							}else{
								this.$Message.error(res.msg);
							}
						});
					}
				});
			},
			edit (el) {
				this.$router.push({
					name: 'AddChanel',
					query: el
				});
			}
		},
		watch: {
			data (n,o) {
				this.init();
			}
		},
		mounted () {
			this.init();
		}
	}
</script>

<style lang="less">
	.tree-wrap{
		border: 1px solid #ddd;
		box-sizing: border-box;
		position: relative;
	}
	.tree-wrap-item-inner{
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: relative;
		padding: 0px 15px 0px 45px;		
	}
	.tree-wrap-item{
		position: relative; 
		padding-left: 20px; 
		box-sizing: border-box; 
		& + &{
			border-top: 1px solid #ddd;
		}	
	}
	.tree-pre-ico{
		position: absolute;
		width: 50px;
		height: 50px;
		left: 0px;
		top: 0px;
	}
	.chidren-wrap{
		padding-bottom: 15px;
		.tree-wrap-item{
			background: #e8f9f0;
		}
	}
</style>