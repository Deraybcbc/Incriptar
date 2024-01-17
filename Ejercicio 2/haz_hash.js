const { error } = require('console');
const express = require('express');
const port = 3778;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");


const app = express();
app.use(express.json());

const PrimeroArchivo = "password.txt";
const SegundoArchivo = "hash.txt";

app.listen(port, () => {
    console.log("Servidor Puerto: " + port);
});

app.post("/encriptar", (req, res) => {
    try {
        const password = fs.readFileSync(PrimeroArchivo, 'utf-8');
        console.log(password);

        const hash = CryptoJS.HmacSHA256(password, password).toString();
        console.log(hash);

        fs.writeFileSync(SegundoArchivo, hash, 'utf-8');

        res.json({Mensaje: "Password Encriptado"});

    } catch (error) {
        console.error('Error al leer o escribir archivos:', error);
        res.status(500).send('Error interno del servidor.');
    }
});