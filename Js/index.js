const jwt=require('jsonwebtoken');
const informacion={nombre:'manuel'};
const firma='Mi_Password_secreto';
const token =jwt.sign(informacion,firma);
const descodificado=jwt.verify(token,firma);

console.log(descodificado);

const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");


const server = express();

server.use(express.json());
server.use(compression());
server.use(helmet());

server.post('/login',(req,res)=>{
    const {usuario,contrasena}=req.body;
    const validado=validarusuariocontrasena(usuario,contrasena);

    if(!validado){
        res.json({error:"Usuario o contraseña incorrecto"});
        return;
    }
    const token =jwt.sign({
        usuario
    },firmaSeguraJwt);

    res.json({token});
});