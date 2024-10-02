var rutas = require("express").Router();
var { mostrarCompras, nuevaCompra, buscarCompraPorId, borrarCompra } = require("../bd/comprasBD");

// Ruta para mostrar todas las compras
rutas.get("/mostrarCompras", async (req, res) => {
    var comprasValidas = await mostrarCompras();
    res.json(comprasValidas);
});

// Ruta para buscar una compra por ID
rutas.get("/buscarCompraPorId/:idVenta", async (req, res) => {
    var compraValida = await buscarCompraPorId(req.params.idVenta);
    //console.log(compraValida);
    res.json(compraValida);
});

// Ruta para borrar una compra por ID
rutas.get("/borrarCompra/:idVenta", async (req, res) => {
    var compraBorrada = await borrarCompra(req.params.idVenta);
    res.json(compraBorrada);
});

// Ruta para agregar una nueva compra
rutas.post("/nuevaCompra", async (req, res) => {
    var compraValida = await nuevaCompra(req.body);
    res.json(compraValida);
});

module.exports = rutas;
