const express = require("express");
const usuariosRutas = require("./Rutas/RutaUsuarios");
const productosRutas = require("./Rutas/RutaProductos");
const comprasRutas = require("./Rutas/RutasCompras");
const session = require("express-session")
const app = express();
const cors = require("cors");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.use (session({
    secret: "abcdefghijk",
    resave: true,
    cookie: {secure:true},
    saveUninitialized: false, // Agrega esta línea
    cookie: { maxAge: 60000 }
}));
app.use("/", usuariosRutas);
app.use("/", productosRutas);
app.use("/" ,comprasRutas)

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log("Servidor en http://localhost:" + port);
});
