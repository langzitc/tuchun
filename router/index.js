import express from 'express';
import Validate from '../api/service/validate.js';
import Auth from '../api/service/auth.js';
import User from '../api/user';
import Public from '../api/public';
import Chanel from '../api/chanel';
import Article from '../api/article';
import Template from '../api/template';
import Classic from '../api/classic';
import Crawler from '../api/crawler';
import Talk from '../api/talk';
import Picture from '../api/picture';
import Shuoshuo from '../api/shuoshuo';
import multer from 'multer';
import qn from 'qn';
import ueditor from 'ueditor';
import config from '../config/db'
import fs from 'fs';
import path from "path";
import Page from './page'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let paths = path.join(__dirname,"../upload",(new Date()).Format("yyyy-MM-dd"));
        if(!fs.existsSync(path.join(__dirname,"../upload"))){
            fs.mkdirSync(path.join(__dirname,"../upload"));
        }
        let flag = fs.existsSync(paths);
        if(!flag){
            fs.mkdirSync(paths);
        }
      cb(null, paths);
    },
    filename: function (req, file, cb) {
        let arr = file.originalname.split(".");
        let prefix = arr[arr.length-1];
      cb(null, (new Date()).getTime()+"."+prefix);
    }
})
const upload = multer({ storage: storage });
const qnupload = multer({
    storage: multer.memoryStorage()
})
const router = express.Router();
router.get("/",(req,res)=>{
    res.redirect('/home')   
})
router.get("/admin",(req,res,next)=>{
    res.redirect("/admin/dist/index.html");
})
router.get("/:page",Page);
router.use("/api/*",Auth);
router.use("/api/upload/fileupload",upload.single('file'),(req,res,next)=>{
    let a = req.file.path;
    let c = a.split("upload");
    let d = c[1].replace(/\\/g,"/");
    res.json({
        code: 200,
        msg: "上传成功",
        path: `http://localhost:4000/upload/${d}`
    });    
})
// 上传到七牛 
router.use("/api/upload/qnupload",(req,res,next)=>{
    let client = qn.create(config.qn_config);
    qnupload.single('file')(req,res,(err)=>{
        if(err){
            res.json({
                code: 503,
                msg: err.toString()
            });
        }
        if(req.file&&req.file.buffer){
            let fileFormat = (req.file.originalname).split("."); 
            let filePath = '/upload/' + req.file.fieldname + '-' +Date.now() + '.' +fileFormat[fileFormat.length - 1];
            client.upload(req.file.buffer, {
                key: filePath
            }, function(err, result) {
                if (err) {
                    res.json({
                        code: 503,
                        msg: err.toString()
                    });
                    console.log(err,2)
                }
                res.json({
                    code: 200,
                    msg: '上传成功',
                    path: config.static_server_url+filePath
                });                
            });            
        }
    })
})
router.use("/api/:route/:param",Validate);
router.use("/api/public/:param",Public);
router.use("/api/user/:param",User);
router.use("/api/chanel/:param",Chanel);
router.use("/api/article/:param",Article);
router.use("/api/template/:param",Template);
router.use("/api/classic/:param",Classic);
router.use("/api/talk/:param",Talk);
router.use("/api/crawler/:param",Crawler);
router.use("/api/shuoshuo/:param",Shuoshuo);
router.use("/api/picture/:param",Picture);
router.use("/ueditor/ue",ueditor(path.join(__dirname, 'public'),{
    qn: config.qn_config   
},(req,res,next)=>{
    let imgDir = '/img/ueditor/'
    if(req.query.action === 'uploadimage'){
        let foo = req.ueditor;
        let imgname = req.ueditor.filename;
        res.ue_up(imgDir);
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage'){ 
        res.ue_list(imgDir);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
    }    
}))
export default router;