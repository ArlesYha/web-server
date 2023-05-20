import express from "express";
import userModel from "./schemas/user-schema.js";

const accountRouter = express();

//Middleware, esto ese ejecuta antes de entrar a la ruta establecida
accountRouter.use((req, resp, next) => {
    next();
})

accountRouter.get('/:guid', async (req, resp) => {
    const {guid} = req.params;

    const user = await userModel.findById(guid).exec();
    
    if(!user) return resp.status(404).send("Error");

    resp.send(JSON.stringify(user));
})

//Crear una nueva cuenta;
accountRouter.post('/', async (req, resp) => {
    const {guid, name} = req.body;

    if(!guid || !name) return resp.status(404).send();

    const user = await userModel.findById( guid).exec();
    
    if(user) return resp.status(409).send()

    const newUser = new userModel({
        _id: guid, name
    })

    await newUser.save();

    return resp.send("Usuario registrado");
})

accountRouter.patch('/:guid', async (req, resp) => {
    const {guid} = req.params;
    const {name} = req.body;

    if(!name) return resp.status(404).send()
    
    const user = await userModel.findById(guid).exec();

    if(!user) return resp.status(404).send()

    user.name = name

    await user.save();

    return resp.send("Usuario Modificado");
})

accountRouter.delete('/:guid', async (req, resp) => {
    const {guid} = req.params;

    const user = await userModel.findById(guid).exec();

    if(!user) return resp.status(404).send();

    await userModel.findByIdAndDelete(guid).exec();

    return resp.send();
})

export default accountRouter;