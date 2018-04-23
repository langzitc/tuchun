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
import multer from 'multer';
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
const router = express.Router();
router.get("/",(req,res)=>{
    res.redirect('/home')   
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
router.use("/api/:route/:param",Validate);
router.use("/api/public/:param",Public);
router.use("/api/user/:param",User);
router.use("/api/chanel/:param",Chanel);
router.use("/api/article/:param",Article);
router.use("/api/template/:param",Template);
router.use("/api/classic/:param",Classic);
router.use("/api/talk/:param",Talk);
router.use("/api/crawler/:param",Crawler);
export default router;