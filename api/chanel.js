import { Chanel, ChanelType } from '../data'
export default async function (req,res,next) {
    try{
        switch (req.params.param) {
            /**
             * @api {post} /template/update_chanel 更新栏目
             * @apiName update_chanel
             * @apiGroup chanel
             * @apiPermission admin
             * @apiParam {Number} id 栏目id,必填
             * @apiParam {Object} data 栏目更新内容,必填
             * @apiVersion 1.0.0
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiParamExample {json} Request-Example:
             *     {
             *       "id": 4711,
             *       "data": {
             *          template: '/default/index.ejs',
             *          name: 'newName'
             *       }
             *     }             
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "更新成功",
             *       "code": 200
             *     }
             */             
            case "update_chanel": 
                let ucda = JSON.parse(JSON.stringify(req.body));
                let uc = await Chanel.findById(req.body.id);
                let ucType = await ChanelType.findById(req.body.cid);
                delete ucda.id;
                delete ucda.cid;
                delete ucda.typeid;
                await uc.updateAttributes(ucda);
                uc.setChanelType(ucType);
                res.json({
                    code: 200,
                    msg: '保存栏目成功'
                })             
            break;
            /**
             * @api {post} /template/update_chanel 删除栏目
             * @apiName del_chanel
             * @apiGroup chanel
             * @apiPermission admin
             * @apiParam {Number} id 栏目id,必填
             * @apiVersion 1.0.0
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiParamExample {json} Request-Example:
             *     {
             *       "id": 4711
             *     }             
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "删除成功",
             *       "code": 200
             *     }
             */               
            case "del_chanel": 
                await Chanel.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                return res.json({
                    code: 200,
                    msg: '删除栏目成功'
                })                
            break;
            /**
             * @api {post} /template/save_chanel 更新栏目
             * @apiName save_chanel
             * @apiGroup chanel
             * @apiPermission admin
             * @apiParam {Object} data 栏目内容,必填
             * @apiVersion 1.0.0
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiParamExample {json} Request-Example:
             *     {
             *       "id": 4711,
             *       "data": {
             *          template: '/default/index.ejs',
             *          name: 'newName'
             *       }
             *     }             
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "添加成功",
             *       "code": 200
             *     }
             */               
            case "save_chanel": 
                let scp = JSON.parse(JSON.stringify(req.body));
                let sctype = await ChanelType.findById(req.body.cid);
                delete scp.cid;
                let scd = await Chanel.build(scp);
                scd.save();
                scd.setChanelType(sctype);
                res.json({
                    code: 200,
                    msg: '添加栏目成功'
                })
            break;
            /**
             * @api {post} /template/get_chanel 获取栏目
             * @apiName get_chanel
             * @apiGroup chanel
             * @apiPermission admin
             * @apiParam {Number} id 栏目id,必填
             * @apiVersion 1.0.0
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiParamExample {json} Request-Example:
             *     {
             *       "id": 4711
             *     }             
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "获取成功",
             *       "code": 200,
             *       "data": {...}
             *     }
             */             
            case "get_chanel": 
                let gcd = await Chanel.findOne({
                    where: {
                        id: req.body.id                         
                    },
                    include: [{
                        model: ChanelType,
                        as: 'chanelType'
                    }]                     
                })
                res.json({
                    code: 200,
                    data: gcd
                })
            break;
            /**
             * @api {post} /template/list_chanel 栏目列表
             * @apiName list_chanel
             * @apiGroup chanel
             * @apiPermission admin
             * @apiVersion 1.0.0
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.           
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "查询成功",
             *       "code": 200,
             *       "data": [...]
             *     }
             */             
            case "list_chanel":            
                let chanelList = await Chanel.findAll({				  
                    include: [{
                        model: ChanelType,
                        as: 'chanelType'
                    }]                    
                });
                let formatCLL = (arr,pid) => {
                    let a = [];
                    arr.forEach(e=>{
                        if(e.pid === pid){
                            let obj = JSON.parse(JSON.stringify(e));
                            let cl = arr.filter(e2=>{
                                return e2.pid === e.id;
                            })
                            if(cl.length){
                                obj.children = formatCLL(arr,e.id);
                            }
                            a.push(obj);
                        }
                    })
                    return a;
                }
                res.json({
                    code: 200,
                    data: formatCLL(chanelList,0)
                })                  
            break;
            case "chanel_list_tree": 
                let chanelListTree = await Chanel.findAll({				  
                    attributes: ['id','name','pid']
                });
                let formatCLT = (arr,pid) => {
                    let a = [];
                    arr.forEach(e=>{
                        if(e.pid === pid){
                            let obj = {};
                            obj.label = e.name;
                            obj.value = e.id;
                            obj.pid = e.pid;
                            let cl = arr.filter(e2=>{
                                return e2.pid === e.id;
                            })
                            if(cl.length){
                                obj.children = formatCLT(arr,e.id);
                            }
                            a.push(obj);
                        }
                    })
                    return a;
                }
                res.json({
                    code: 200,
                    data: formatCLT(chanelListTree,0)
                })                
            break;
            case "update_chanel_type": 
                let uct = await ChanelType.findById(req.body.id);
                await uct.updateAttributes(req.body);
                res.json({
                    code: 200,
                    msg: '保存栏目类型成功'
                })                 
            break;
            case "del_chanel_type": 
                await ChanelType.destroy({
                    where: {
                        id: req.body.id
                    }
                })
                res.json({
                    code: 200,
                    msg: '删除栏目类型成功'
                })             
            break;
            case "save_chanel_type": 
                let sctp = JSON.parse(JSON.stringify(req.body));
                await ChanelType.build(sctp).save();
                res.json({
                    code: 200,
                    msg: '添加栏目类型成功'
                })            
            break;
            case "list_chanel_type":             
                let chaneltypeList = await ChanelType.findAll();
                res.json({
                    code: 200,
                    data: chaneltypeList
                })                
            break;        
        }         
    }catch(e){
        res.json({
            code: 503,
            msg: e.toString()
        })
        throw new Error(e);
    }
}