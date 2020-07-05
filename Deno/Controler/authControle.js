import db from "../db/db.js";
const userCollection = db.collection("users");
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import hash from "../util/hash.js";
import validate from "../validate.js"
import { config } from "https://deno.land/x/dotenv/mod.ts";
import token from "../util/token.js"
import { makeJwt, setExpiration } from "https://deno.land/x/djwt/create.ts";

export default {

    async login(ctx){
        const value = await validate.validateLogin(ctx);
        if (!value){
            ctx.response.status = (422);
            ctx.response.body = {error:"Give Needed detailes"}
            return ;
        }
        const user = await userCollection.findOne({email:value.email})
        if (!user){
            ctx.response.status = (422);
            ctx.response.body = {error:"Dosen't match out record!"}
            return ;
        }
        var Matchedpw = await hash.verify(user['password'],value['password']);
        console.log(Matchedpw,"123")
        if (!Matchedpw){
            ctx.response.status = (422);
            ctx.response.body = {error:"Password Dosen't match"}
            return ;
        }  
        var email = user.email ;
        ctx.response.body = await token.generate(email);
        
    }
}