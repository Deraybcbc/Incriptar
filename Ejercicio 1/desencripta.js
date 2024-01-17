const { error } = require('console');
const express = require('express');
const port = 3778;
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


app.post("/desenciptar", (req, res) => {
    try {

        const data = fs.readFileSync(ArchivoGuardar, 'utf-8');
        console.log(data);

        const key = "1234";


        const desencriptado = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
        console.log(desencriptado);

        fs.writeFileSync(ArchivoResult, desencriptado, 'utf-8');

        res.json("Desencriptado con exito")

    } catch (error) {
        console.error('Error al leer o escribir archivos:', error);
        res.status(500).send('Error interno del servidor.');
    }
});