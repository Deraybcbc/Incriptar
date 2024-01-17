const { error } = require('console');
const express = require('express');
const port = 3779;
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

app.post("/comprobar", (req, res) => {
    try {

        //Leer los archivos
        const password = fs.readFileSync(PrimeroArchivo, 'utf-8').toString();
        console.log(password);
        const hashGuardado = fs.readFileSync(SegundoArchivo, 'utf-8').toString();
        console.log(hashGuardado);

        //Generar el hash para poder comprobar que sean iguales
        const hashPrueba = CryptoJS.HmacSHA256(password,password).toString(CryptoJS.enc.Hex);
        console.log(hashPrueba);
        
        //CONDICIONAL PARA VER LA SIMILITUD
        if (hashPrueba == hashGuardado) {
            res.json({Mensaje: "El hash es correcto. La contraseña coincide."})
            console.log('El hash es correcto. La contraseña coincide.');
        } else {
            res.json({Mensaje: "El hash no es correcto. La contraseña no coincide."})
            console.log('El hash no es correcto. La contraseña no coincide.');
        }


    } catch (error) {
        console.error('Error al leer o escribir archivos:', error);
        res.status(500).send('Error interno del servidor.');
    }
})
