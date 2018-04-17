<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		栏目列表
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="error">批量删除</Button>
      	</Col>
      </Row>
      <div>
			<chanel-tree :data="chanelList" v-if="chanelList.length"></chanel-tree>
			<Alert type="warning" v-else>无栏目</Alert>
            <Spin fix v-if="loading">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </Spin>			
      </div>
  </Card>
</template>

<script>
	import ChanelTree from './common/chanel-tree'
	import { mapState } from 'vuex'
	export default {
		name: 'ChanelList',
		data () {
			return {
				loading: false
			}
		},
		components: {
			ChanelTree
		},
		computed: {
			...mapState({
				chanelList: state => state.chanelList
			})
		},
		methods: {
			loadData () {
					this.loading = true;
	        this.$store.dispatch('getChanelList').catch(msg=>{
	        		this.$Message.error(msg);
	        }).complete(()=>{
	        		this.loading = false;
	        })
			}
		},
		mounted () {
			this.loadData();
		}
	}
</script>

<style>
</style>