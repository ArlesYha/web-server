import { Router } from "express";
import { USERS_BBDD } from "./bbdd.js";
import authByEmailPwd from "./helpers/auth-by-email-pwd.js";

const authRouter = Router();

//Endpoint public (No autenticado y no autorizado)
authRouter.get("/publico", (req, resp) => {
    resp.send("Endpoint publico")
})

//Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", (req, resp) => {
    const {email, password} = req.body

    if(!email || !password) return resp.send(400)

    try {
        const user = authByEmailPwd(email, password)
        return resp.send(`Usuario ${user.profile.name} autenticado`)
    } catch (error) {
        return resp.send(401)
    }

})

//Endpoint autorizado a adminstradores
authRouter.post("/autorizado", (req, resp) => {
    const {email, password} = req.body

    if(!email || !password) return resp.send(400)

    try {
        const user = authByEmailPwd(email, password)
    
        if(user.role !== 'admin') return resp.send(403, "Usuario no administrador")
    
        return resp.send(`Usuario administrador ${user.profile.name}`)
    } catch (error) {
        return resp.send(401)
    }
})


export default authRouter;