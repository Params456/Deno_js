import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

var key = env.key;

const jwtToken =async (ctx,next)=>{
    var header = await ctx.request.headers;
    var authorization1 =  header.get("Authorization");
    console.log(authorization1)
    await next();   
}

export default jwtToken;