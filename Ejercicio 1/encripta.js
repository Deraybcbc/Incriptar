const { error } = require('console');
const express = require('express');
const port = 3777;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");



const app = express();
app.use(express.json());


const ArchivoLeer = "data.txt";
const ArchivoGuardar = "data.encript";
const ArchivoResult = "result.txt";

app.listen(port, () => {
    console.log("Servidor: " + port);
});



app.post("/encripta", (req, res) => {
    try {
        //Leer el archivo data.txt
        const data = fs.readFileSync(ArchivoLeer, 'utf-8');
        console.log(data);

        //Generar llaves aleatorias i un vector inicializado
        const key = "1234"

        const encriptado = CryptoJS.AES.encrypt(data, key).toString();
        console.log(encriptado);

        fs.writeFileSync(ArchivoGuardar, encriptado, 'utf-8');

        res.json("Mensaje Incriptado");
    } catch (error) {
        console.error('Error al leer o escribir archivos:', error);
        res.status(500).send('Error interno del servidor.');

    }

});