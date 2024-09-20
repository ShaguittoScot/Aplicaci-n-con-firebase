const express = require("express");
const usuariosRutas = require("./Rutas/RutaUsuarios");
const productosRutas = require("./Rutas/RutaProductos");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", usuariosRutas);
app.use("/", productosRutas);

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log("Servidor en http://localhost:" + port);
});
