import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
    async bcryptAll(stringToHash){
        const hash = await bcrypt.hash(stringToHash)
        return hash
    },
    async verify(hash,text){
        const result = await bcrypt.compare(text,hash);
        return result;
    }
}