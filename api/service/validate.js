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
        type: 'string'
    },{
        name: 'email',
        required: true,
        type: 'string'
    },{
        name: 'password',
        required: true,
        type: 'string'
    }]
}
export default function Validate (req,res,next) {
    let el = rules[req.params.param];
    if(el&&el.length){
        let arr = [];
        for(let r of el) {
            if(r.required&&!req.body[r.name]) {
                arr.push(errorResult.required(r.name));
                if(r.type&&typeof req.body[r.name] !== r.type) {
                    arr.push(errorResult.type(r.name,r.type));
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