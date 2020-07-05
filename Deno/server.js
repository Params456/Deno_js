import { Application } from "https://deno.land/x/oak/mod.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";


const app = new Application();

const env = config();

import router from "./router.js"

import Notfound from "./404.js"

app.use(router.routes());

app.use(Notfound);

var port = +env.app_port || 8000 ;

var land = env.app_host || 'https://localhost/'

console.log(`server started at ${land} ${port}`)

await app.listen({ port: port });           