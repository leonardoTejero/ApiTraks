
const express = require("express");
const fs = require("fs");

const router = express.Router();

// ruta del archivo en la maquina c:/users/documentos...
const PATH_ROUTES = __dirname; 

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};

// Genera las rutas dinamicas con el nombre del archivo
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if(name !== "index"){ 
         // http://localhost:3000/api/tracks || storage || nombreArchivo
        router.use(`/${name}`, require(`./${file}`)); 
    }
});

module.exports = router;


