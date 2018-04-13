
export default class Service {
    validate () {
        for (let r of this.params) {
            let pl = this.params[r];
            if(pl) {
                if(Array.isArray(pl)){
                    pl.forEach(e=>{
                        
                    })
                }else{

                }
            }
        }
    }
}