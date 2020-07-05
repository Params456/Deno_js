import { Router } from "https://deno.land/x/oak/mod.ts";

import userControle from "./Controler/controles.js"

import toKen from "./util/verify.js"  

import authcontrole from "./Controler/authControle.js"

var router = new Router();

router
  .get("/user",toKen,userControle.index)
  .get("/user/:id",toKen,userControle.read)
  .post("/user",userControle.create)  
  .patch("/user/:name",toKen,userControle.update)
  .delete("/user/:name",toKen,userControle.delete);

router.post("/login",authcontrole.login);
export default router;   