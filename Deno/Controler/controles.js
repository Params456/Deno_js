import db from "../db/db.js";
const user = db.collection("users");
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import hash from "../util/hash.js";
import validate from "../validate.js"
export default {
    async index(ctx) {
        ctx.response.body = await user.find();
    },

    async create (ctx) {
        
        const value = await validate.validate(ctx)
        value["created_at"] = new Date();
        value.password = await hash.bcryptAll(value.password)
        console.log(value.password)
        if (value){
            ctx.response.status = 201;
            var valId = await user.insertOne(value)
            ctx.response.body = valId ;
        }
    
    },

    async read(ctx) {
        try {
            ctx.response.body = await user.find({_id: ObjectId(ctx.params.id)});
            
        } catch (error) {
            ctx.response.status = 404;
            ctx.response.body = {"error":"User is not avilable!"}
        }
    },

    async update (ctx){
  
        var value = await validate.validateUpdate(ctx);
        var find1 = await user.find({name:ctx.params.name})
        if (find1.length !== 0){        
            if (value){
            var valId = ctx.params.name
            var data = {email:value.email,name:value.name,password:value.password}
            
            var upDate = user.updateOne({name:valId},{$set:data})
            ctx.response.body = {message : "updated"};
        }}else{
            ctx.response.status = 404;
            ctx.response.body = {error : "This user name is not defined"}
        }



  },
    async delete (ctx){
        var find1 = await user.find({name:ctx.params.name})
        if (find1.length !== 0){        
            var deLet = await user.deleteOne({name:ctx.params.name})
            ctx.response.body = "deleted"
        }else{
            ctx.response.status = 404;
            ctx.response.body = {error : "This user name is not defined"}
        }
    }
}   