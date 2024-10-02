var rutas = require("express").Router();
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorId} = require("../bd/productosBD");


rutas.get("/mostrarProductos",async (req,res) =>{
    //res.send("Hola etas en raiz");
    var producosValidos = await mostrarProductos();
    //console.log(usuarisValidos);
    res.json(producosValidos);
});

rutas.get("/buscarProductoPorId/:id", async(req,res) => {
    var producosValidos = await buscarPorId(req.params.id)
    //console.log (usuarioValido);
    res.json(producosValidos);
    
});

rutas.get("/borrarProducto/:id", async(req,res) => {
    var ProductoBorrado = await borrarProducto(req.params.id);
    res.json(ProductoBorrado);
});

rutas.post("/nuevoProducto", async (req,res) => {
    // cantidad a numero
    if (req.body.cantidad) {
        req.body.cantidad = parseInt(req.body.cantidad, 10);
    }
    // precio a numero
    if (req.body.precio) {
        req.body.precio = parseFloat(req.body.precio);
    }
    var productoValido = await nuevoProducto(req.body);
    console.log(productoValido);
    res.json(productoValido);
})


module.exports = rutas;