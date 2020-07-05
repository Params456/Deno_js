import { makeJwt, setExpiration } from "https://deno.land/x/djwt/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";


const env = config();

var key = env.key;

const header = {
  alg: "HS256",
  typ: "JWT",
};

export default { generate(login)  {
    if (login){        
        const payload = {
        iss: "joe",
        // exp: setExpiration(new Date().getTime() + 60000),
    }
    const jwt = makeJwt({key,header,payload});
    if (jwt){
        return jwt;
    }else{
        ctx.response.body = "Error";
    }
  }}
}
