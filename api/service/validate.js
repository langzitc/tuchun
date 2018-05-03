const errorResult = {
    required (field) {
        return `field ${field} is required!`;
    },
    type (field,types) {
        return `field ${field} is required the type of ${types}`;
    }
}
const rules = {
    admin_login: [{
        name: 'username',
        required: true,
        type: 'string'
    },{
        name: 'password',
        required: true
    },{
        name: 'code',
        required: false,
        type: 'string'
    }],
    user_login: [{
        name: 'username',
        required: true,
        type: 'string'
    },{
        name: 'password',
        required: true,
        type: 'string'
    },{
        name: 'code',
        required: false,
        type: 'string'
    }],
    user_register: [{
        name: 'tel',
        required: true,
        type: /^1[3|4|5|8][0-9]\d{4,8}$/
    },{
        name: 'email',
        required: true,
        type: 'string'
    },{
        name: 'password',
        required: true,
        type: 'string'
    }],
    list_user: [{
        name: 'page',
        required: false,
        type: 'number'
    },{
        name: 'pageSize',
        required: false,
        type: 'number'
    }],
    update_user: [{
        name: 'id',
        required: true,
        type: 'number'
    },{
        name: 'user',
        required: true,
        type: 'object'
    }],
    del_user: [{
        name: 'id',
        required: true,
        type: 'number'
    }],
    save_user: [{
        name: 'tel',
        required: true,
        type: /^1[3|4|5|8][0-9]\d{4,8}$/
    },{
        name: 'email',
        required: true,
        type: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    },{
        name: 'password',
        required: true,
        type: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    }],
    get_user: [{
        name: 'id',
        required: false,
        type: 'number'
    },{
        name: 'tel',
        required: false,
        type: /^1[3|4|5|8][0-9]\d{4,8}$/
    },{
        name: 'email',
        required: true,
        type: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    }]
}
export default function Validate (req,res,next) {
    let el = rules[req.params.param];
    if(el&&el.length){
        let arr = [];
        for(let r of el) {
            if(r.required&&!req.body[r.name]) {
                arr.push(errorResult.required(r.name));  
                break;            
            }
            if(req.body[r.name]) {
                if(r.type&&r.type === 'number' && !Number.isInteger(parseInt(req.body[r.name]))) {
                    arr.push(errorResult.type(r.name,r.type));
                    break;
                }
                else if(r.type&&r.type.test&&!r.type.test(req.body[r.name])){
                    arr.push(errorResult.type(r.name,r.type));
                    break;                    
                }else if(r.type&&r.type!=='number'&&!r.type.test&&!(typeof req.body[r.name] === r.type)){
                    arr.push(errorResult.type(r.name,r.type));
                    break;                      
                }                  
            }
        }    
        if (arr.length) {
            res.json({
                code: 501,
                msg: arr.join(',')
            })
        } else {
            next();
        }    
    }else{
        next();
    }
}