import fs from 'fs'
import path from 'path'
import { walk } from '../until'
function createFolder (to) {
    let sep = path.sep;
    let folders = path.dirname(to).split(sep);
    let p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }    
}
const temp_path = path.join(__dirname,'../page');
export default function (req,res,next) {
    try{
        switch (req.params.param) {
            /**
             * @api {post} /template/update_template 更新模板
             * @apiName update_template
             * @apiGroup template
             * @apiPermission admin
             * @apiParam {String} path 模板路径,必填
             * @apiParam {String} content 模板内容,必填
             * @apiVersion 1.0.0
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "更新成功",
             *       "code": 200
             *     }
             */       
            case "update_template": 
                let newTemplate2 = path.join(temp_path,req.body.path); 
                let utMsg = null,utCode = 200;
                if(fs.existsSync(newTemplate2)){
                    let utBuf = Buffer.from(req.body.content,'utf-8');
                    fs.writeFileSync(newTemplate2,utBuf);
                    utMsg = '更新成功';
                }else{
                    utMsg = '模板不存在';
                    dtCode = 404;
                }
                res.json({
                    code: utCode,
                    msg: utMsg
                });
            break;
            /**
             * @api {post} /template/del_template 删除模板
             * @apiName del_template
             * @apiGroup template
             * @apiPermission admin
             * @apiParam {String} path 模板路径,必填
             *
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiVersion 1.0.0
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "删除成功",
             *       "code": 200
             *     }
            * @apiErrorExample {json} Error-Response:
            *     HTTP/1.1 503 Access Denied
            *     {
            *       "error": "access denied"
            *     }
             */          
            case "del_template": 
                let newTemplate3 = path.join(temp_path,req.body.path); 
                let dtMsg = null,dtCode = 200;
                if(fs.existsSync(newTemplate3)){
                    fs.unlinkSync(newTemplate3);
                    dtMsg = '删除成功';
                }else{
                    dtMsg = '模板不存在';
                    dtCode = 404;
                }
                res.json({
                    code: dtCode,
                    msg: dtMsg
                });            
            break;
            /**
             * @api {post} /template/save_template 添加模板
             * @apiName save_template
             * @apiGroup template
             * @apiPermission admin
             * @apiParam {String} path 模板路径,必填
             * @apiParam {String} name 模板名称,必填
             * @apiParam {String} content 模板内容,必填
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiVersion 1.0.0
             * @apiParamExample {json} Request-Example:
             *     {
             *       "path": '/default',
             *       "name": 'index.ejs',
             *       "content": ''
             *     }         
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "添加成功",
             *       "code": 200
             *     }
             */         
            case "save_template": 
                let newTemplate = path.join(temp_path,req.body.path+"/"+req.body.name);
                if(fs.existsSync(newTemplate)){
                    fs.writeFileSync(newTemplate,req.body.content);
                }else{
                    createFolder(newTemplate);
                    let writeStream = fs.createWriteStream(newTemplate);
                    let stBuf = Buffer.from(req.body.content,'utf-8');
                    writeStream.write(stBuf,'utf-8');
                    writeStream.end();
                }
                res.json({
                    code: 200,
                    msg: '添加成功'
                });         
            break;
            /**
             * @api {post} /template/get_template 获取模板
             * @apiName get_template
             * @apiGroup template
             * @apiPermission admin
             * @apiParam {String} path 模板路径,必填
             *
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiVersion 1.0.0
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "查询成功",
             *       "code": 200,
             *       "data": [{
             *             name: 'index.ejs',
             *             path: '/default',
             *             content: ''
             *       }]
             *     }
             */           
            case "get_template": 
                let newTemplate4 = path.join(temp_path,req.body.path);
                if(fs.existsSync(newTemplate4)){
                    let gtcon = fs.readFileSync(newTemplate4);
                    res.json({
                        code: 200,
                        msg: '读取成功',
                        data: gtcon.toString()
                    });
                }else{
                    res.json({
                        code: 404,
                        msg: '模板不存在'
                    })
                } 
            break;
            /**
             * @api {post} /template/list_template 模板列表
             * @apiName list_template
             * @apiGroup template
             * @apiPermission admin
             * @apiVersion 1.0.0
             * @apiSuccess {String} msg 消息.
             * @apiSuccess {Number} code 状态码.
             * @apiSuccessExample {json} Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "msg": "查询成功",
             *       "code": 200,
             *       "data": [{
             *             name: 'index.ejs',
             *             path: '/default'
             *       }]
             *     }
             */         
            case "list_template": 
                let tempList = [];
                if(fs.existsSync(temp_path)){
                    tempList = walk(temp_path);
                }else{
                    createFolder(temp_path);
                }
                res.json({
                    code: 200,
                    msg: '查询成功',
                    data: tempList
                });            
            break;
        } 
    }catch(e){
        res.json({
            code: 504,
            msg: e.toString()
        });
    }      
}