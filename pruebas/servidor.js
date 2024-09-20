const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;


//middleware
var saludo = (req, res, next) => {
    console.log("Hola");
    next();
}



app.get("/", saludo, (req, res) => {
    res.send("hola estas en la laiz")
})
app.get("/home", saludo, (req, res) => {
    res.send("hola estas en home")
})

app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});