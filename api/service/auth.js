import md5 from 'md5'
const exincludePath = [
    "public/admin_login",
    "public/user_login",
    "public/user_register",
    "public/search_song",
    "public/get_capatcha",
    "user/test"
]
export default function Auth (req,res,next) {
    if(!req.session.sid){
        req.session.sid = md5(req.ip+(new Date()).getTime());
    }
    if (exincludePath.includes(req.params[0])) {
        if(req.params[0].includes('login')){
            if(req.session.login_count&&req.session.login_count > 3){
                if(req.body.captcha_code){
                    if(req.body.captcha_code === req.session.captcha_code){
                        next();
                    }else{
                        res.json({
                            code: 506,
                            msg: '图形验证码错误'
                        })
                    }
                }else{
                    res.json({
                        code: 505,
                        msg: '请输入图形验证码'
                    })
                }
            }else{
                next();
            }              
        }else{
            next();
        }
    } else if (!req.session.user) {
        res.json({
            code: 502,
            msg: '请登录'
        })
    } else{
        next();
    }
}