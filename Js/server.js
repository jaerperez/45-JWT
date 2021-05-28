const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expresjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const cors = require("cors");



const server = express();

server.use(express.json());
server.use(compression());
server.use(helmet());
server.use(cors());

const limit = rateLimit({
    windowMs: 10 * 1000,
    max: 3,
    message: "Excediste el numero de peticiones intenta mas tarde",
});


//3.2 definir la cadena segura de generación de token

const secretJWT = "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";

//3.3 proteger todos los endpoints menos el de login usando express-jwt como middleware global

server.use(expresjwt({
    secret: secretJWT,
    algorithms: ["HS256"],
}).unless({
    path: ["/login"],
}));

const PORT = 3000;
const USERS = [
    {
        id: 1,
        username: "jperez",
        pws: "M1mo100",
        rol:"admin"
    },
    {
        id: 2,
        username: "nosorio",
        pws: "cal!100",
        rol:"admin"
    },
    {
        id: 3,
        username: "peter100",
        pws: "H3l4d0500",
        rol:"user"
    },
    {
        id: 4,
        username: "giselap",
        pws: "d3s4yun0",
        rol:"user"
    },
]



const MASCOTAS = [
    {
        id: 1,
        nombre: "firulais",
        tipo: "perro",
        propietario: 1
    },
    {
        id: 2,
        nombre: "firulais",
        tipo: "gato",
        propietario: 3
    }

]


const middlewareValidarinput = (req, res, next) => {
    if (!req.body.username || !req.body.pws) {
        res.status(400).json({ error: "Por favor digitar los datos completos" });
    } else {
        const credcorrect = USERS.find((usu) => usu.username == req.body.username && usu.pws == req.body.pws);
        console.log(credcorrect);
        if (!credcorrect) {
            res.status(401).json({ error: "User or password incorrect" });
        } else {
            req.credcorrect=credcorrect;
            next();
        }
    }
};


const roleauthorization =(req,res,next)=>{
    const rolaut="admin";
    if(req.credcorrect.rol!==rolaut){
        res.status(403).json({ error: "You do not have permissions to access features"});
    }else{
        next();
    }
}

server.post("/login", middlewareValidarinput, roleauthorization, (req, res) => {
    const token = jwt.sign(
        {
            nombre: req.credcorrect.username,
            id: req.credcorrect.pws,
            otraCosa: "lo que quieran",
        },
        secretJWT,
        { expiresIn: "60m" }
    );
    res.status(200).json({token});
})

server.listen(PORT, () => {
    console.log(`servidor iniciado en puerto ${PORT}`)
});




/*
const middlewareValidarinput = (req, res, next) => {
    if (!req.body.username || !req.body.pws) {
        res.status(400).json({ error: "Por favor digitar los datos completos" });
    } else {
        const requestuser = USERS.find(aut => aut.username == req.body.username && aut.pws == req.body.pws);
        console.log(requestuser);
        if (!requestuser) {
            res.status(400).json({ error: `Error usuario o contraseña por favor intente de nuevo` });
        } else {
            const i = USERS.indexOf(requestuser);
            if (USERS[i].pws !== req.body.pws) {
                res.status(400).json({ error: `Error contraseña` });
            } else {
                next();
            }
        }
    }
};*/