export default {

    async validate(ctx){
    var {value} =  await ctx.request.body();

        if (!value){ 
            ctx.response.status = 400;
            ctx.response.body = {error : "Please provide req data"}
            return;
       }
       var a = ['email','password','name']
       var arr = [];
       var status;
       for (var i of a){
            if (!value[i]){
                status = 422; //required
                arr.push({error : `${i} required`})
            }

       }
    if (status){
        ctx.response.status = 404;
        ctx.response.body = {arr};
        return false;
    }

    return value;
    // console.log(value)

    },

    async validateUpdate (ctx){
        var {value} =  await ctx.request.body();
        let r = 0
        for (var i in value){
            if (value[i] === ""){
                r+=1
            }
        }
        if (!value || Object.keys(value).length === 0 || r!==0){ 
            ctx.response.status = 400;
            ctx.response.body = {error : "Please provide req data"}
            return false;
       }
       return value;

    },
    async validateLogin(ctx){
        var {value} =  await ctx.request.body();
    
            if (!value){ 
                ctx.response.status = 400;
                ctx.response.body = {error : "Please provide req data"}
                return;
           }
           var a = ['email','password']
           var arr = [];
           var status;
           for (var i of a){
                if (!value[i]){
                    status = 422; //required
                    console.log(i)    
                    arr.push({error : `${i} required`})
                }
           }
        if (status){
            ctx.response.status = 404;
            ctx.response.body = {arr};
            return false;
        }
        if (value){
            return value;
        }
    }
}