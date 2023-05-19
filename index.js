console.clear();
// import {createServer} from 'http';
import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './account.js';
import authRouter from './auth.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const expressApp = express();

expressApp.use(express.json())
expressApp.use(express.text())

expressApp.use("/account", accountRouter)
expressApp.use("/auth", authRouter)

expressApp.post('/cuenta/:idcuenta/:idinventado', (req, resp) => {
    //obtener cabeceras
    //req.get(*nombre de la cabecera*)
    //--------------------------------
    // resp.status(401).send({
    //     errorMessage: 'No autorizado'
    // })
    // resp.send(req.params)
    console.log(req.body)
    resp.send();
    // resp.send('Tu cuenta personal');
});

expressApp.put('/producto', (req, resp) => {
    console.log(req.body)

    resp.send()
});

expressApp.listen(PORT, () => {
    console.log(`SERVIDOR LEVANTADO EN EL PUERTO ${PORT}`);
});

// const httpServer = createServer((req, resp) => {
//     //Verbo o método para indicar que quiere hacer el cliente
//     // console.log(req.method);
//     //Path o ruta para identificar el recurso
//     // console.log(req.url);
//     //Cabeceras
//     // console.log(req.headers);
//     //body/payload
//     let data = '';
//     let chunkIndex = 0;
//     req.on('data', (chunk) => {
//         data += chunk;
//         chunkIndex++;
//         console.log(chunkIndex);
//     });

//     req.on('end', () => {
//         // console.log(data)
//         resp.end('RECIBIDO COLEGA');
//     });

// });

// httpServer.listen(PORT)