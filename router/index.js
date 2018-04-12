import express from 'express';
import User from '../api/user';
import Public from '../api/public';
import Chanel from '../api/chanel';
import Article from '../api/article';
import Template from '../api/template';
import Classic from '../api/Classic';
import Talk from '../api/talk';
const router = express.Router();
router.get("/",(req,res)=>{
    res.render('index.ejs', {
        title: 'tuchun',
        desc: 'tuchun website',
        keywords: 'tuchun web'
    });    
})
router.use("/api/public/:param",Public);
router.use("/api/user/:param",User);
router.use("/api/chanel/:param",Chanel);
router.use("/api/article/:param",Article);
router.use("/api/template/:param",Template);
router.use("/api/classic/:param",Classic);
router.use("/api/talk/:param",Talk);
export default router;