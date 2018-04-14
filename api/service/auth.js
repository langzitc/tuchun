import md5 from 'md5'
const exincludePath = [
    "public/admin_login",
    "public/user_login",
    "public/user_register",
    "public/test",
    "user/test"
]
export default function Auth (req,res,next) {
    console.log(req.session.sid)
    if(!req.session.sid){
        req.session.sid = md5(req.ip+(new Date()).getTime());
    }
    if (exincludePath.includes(req.params[0])) {
        next();
    } else if (!req.session.user) {
        res.json({
            code: 502,
            msg: '请登录'
        })
    } else{
        next();
    }
}