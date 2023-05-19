import express from "express";
import {USERS_BBDD} from './bbdd.js'

const accountRouter = express();

//Middleware, esto ese ejecuta antes de entrar a la ruta establecida
accountRouter.use((req, resp, next) => {
    next();
})

accountRouter.get('/:guid', (req, resp) => {
    const {guid} = req.params;

    const user = USERS_BBDD.find(user => user.id === guid)
    
    if(!user) return resp.status(404).send("Error");

    resp.send(JSON.stringify(user));
})

accountRouter.post('/', (req, resp) => {
    const {guid, name} = req.body;

    if(!guid || !name) return resp.status(404).send();

    const user = USERS_BBDD.find(user => user.id === guid)
    
    if(user) return resp.status(409).send()

    USERS_BBDD.push({
        id: guid, name
    })

    return resp.send();
})

accountRouter.patch('/:guid', (req, resp) => {
    const {guid} = req.params;
    const {name} = req.body;

    if(!name) return resp.status(404).send()
    
    const user = USERS_BBDD.find(user => user.id === guid)

    if(!user) return resp.status(404).send()

    user.name = name

    return resp.send();
})

accountRouter.delete('/:guid', (req, resp) => {
    const {guid} = req.params;
    
    const userIndex = USERS_BBDD.findIndex(user => user.id === guid)
    if(userIndex === -1) return resp.status(404).send();

    USERS_BBDD.splice(userIndex, 1)
    console.log(USERS_BBDD)
    return resp.send();
})

export default accountRouter;