<template>
  <Card>
      <Row slot="title">
      	<Col :span="12" class="text-left">
      		采集任务列表
      	</Col>
      	<Col :span="12" class="text-right">
      		<Button type="success" @click="addTask = true">添加任务</Button>
      		<task-form v-model="addTask" @on-save="loadData"></task-form>
      		<task-form v-model="editTask" :data="selectTask" title="编辑任务" @on-save="loadData"></task-form>
      	</Col>
      </Row>
      <div>
          <Table :loading="loading" :data="data" :columns="columns"></Table>
      </div>
	  <Modal
	        v-model="showProgress"
	        title=""
	        :closable="false"
	        :mask-closable="false"
	        class-name="modal-scroll"
	  >
	  	<div slot="header"></div>
	  	<div slot="footer"></div>
			<dl v-for="(el,index) in progressList" :key="index" style="margin-bottom: 15px;">
				<dt>{{el.title}}</dt>
				<dt style="margin: 5px 0;">{{el.url}}</dt>
				<dd>
					<Progress :percent="el.percent" :status="el.percent == 100 ? 'success': 'active'"></Progress>
				</dd>
			</dl>
	  </Modal>      
  </Card>
</template>
<script>
import TaskForm from './common/TaskForm'
import { socket } from '../socket'
let _this = null;
export default {
    name: 'CollectTask',
    data () {
        return {
        	showProgress: false,
            columns: [{
                title: '任务名',
                key: 'taskName'
            },{
                title: '链接',
                width: 300,
                render (h,r) {
                	let arr =[];
                	r.row.uri.forEach(e=>{
                		arr.push(h('p',e));
                	})
                	return h('p',arr)
                }
            },{
                title: '自动采集',
                render (h,r) {
                	return h('span',r.row.isAuto ? "是" : "否");
                }
            },{
                title: '自动采集时间',
                render (h,r) {
                	if(r.row.isAuto){
                		let {year,month,week,day,hour,minute,second} = r.row;
                		return h('span',`${year},${month},${week},${day},${hour},${minute},${second}`);
                	}else{
                		return h('span','无');
                	}
                }
            },{
                title: '是否自动导入',
                align: 'center',
                render (h, r) {
                	return h('span',r.row.isAutoImport ? '是' : "否")
                }
            },{
                title: '导入栏目',
                render (h,r) {
                	return h('span',r.row.chanelName);
                }
            },{
        		title: '操作',
        		width: 350,
        		align: 'right',
        		render (h,r){
        			return h('span',[
        				h('Button',{
        					props: {
        						type: 'info',
        						size: 'small'
        					},
        					on: {
        						'click' () {
        							_this.selectTask = JSON.parse(JSON.stringify(r.row));
        							_this.editTask = true;
        						}
        					}
        				},'编辑'),
        				h('Button',{
        					props: {
        						type: 'warning',
        						size: 'small'
        					},
        					style: {
        						marginLeft: '5px'
        					},
        					on: {
        						'click' () {
									_this.$http.post("/crawler/clear_task",{
										taskName: r.row.taskName
									}).then(res=>{
										if(res.code === 200){
											_this.$Message.success(res.msg);
										}else{
											_this.$Message.error(res.msg);
										}
									})
        						}
        					}
        				},'清空'),        				
        				h('Button',{
        					props: {
        						type: 'error',
        						size: 'small'
        					},
        					style: {
        						margin: "0 5px"
        					},
        					on: {
        						'click' () {
									_this.$Modal.confirm({
										title: '提示',
										content: '确认删除?',
										onOk: ()=>{
            								_this.$http.post("/crawler/del_task",{taskName:r.row.taskName}).then(res=>{
            									if(res.code === 200){
            										_this.$Message.success(res.msg);
            										_this.loadData();
            									}else{
            										_this.$Message.error(res.msg);
            									}
            								}).catch(e=>{
            									_this.$Message.error('删除失败');
            								})
										}
									})
        						}
        					}
        				},'删除'),
        				h('Button',{
        					props: {
        						type: 'success',
        						size: 'small',
        						icon: 'play'
        					},
        					on: {
        						'click' () {
        							_this.showProgress = true;
									socket.emit('crawler',r.row.taskName);
									socket.on('start_new_task',(data)=>{
										_this.progressList = data;
									})
									socket.on('task_finished',()=>{
										_this.progressList = [];
										_this.showProgress = false;
										_this.$Message.success('采集成功');
									})	
        						}
        					}
        				},'采集'),
        				h('Button',{
        					props: {
        						type: 'primary',
        						size: 'small',
        						icon: 'ios-upload'
        					},
        					style: {
        						marginLeft: '5px'
        					},
        					on: {
        						'click' () {
									_this.$http.post("/crawler/import_task",{
										taskName: r.row.taskName
									}).then(res=>{
										if(res.code === 200){
											_this.$Message.success(res.msg);
										}else{
											_this.$Message.error(res.msg);
										}
									})
        						}
        					}
        				},'导入数据库')          				
        			])
        		}
            }],
            data: [],
            loading: false,
            addTask: false,
            editTask: false,
            selectTask: {},
            progressList: []
        }
    },
    methods: {
        loadData () {
            this.loading = true;
            this.$http.post('/crawler/task_list').then(res=>{
                if(res.code === 200){
                	this.data = res.data;
                }else{
                	this.$Message.error(res.msg);
                }
            }).catch(e=>{
                this.$Message.error("获取任务列表失败");
                throw new Error(e);
            }).complete(()=>{
                this.loading = false;
            })
        }
    },
    mounted () {
		this.loadData();
		_this = this;
    },
    components: {
    	TaskForm
    }
}
</script>
<style lang="less">

</style>

