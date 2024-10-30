var rutas = require("express").Router();
var { mostrarCompras, nuevaCompra, buscarCompraPorId, actualizarEstadoCompra,editarCompra } = require("../bd/comprasBD");

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

// Ruta para actualizar una compra por ID
rutas.patch("/actualizarEstadoCompra/:idVenta/:nuevoEstado", async (req, res) => {
    const idVenta = req.params.idVenta;
    const nuevoEstado = req.params.nuevoEstado; // Captura el nuevo estado desde los parámetros de la ruta

    // Validar si el nuevo estado es válido
    const estadosValidos = ["activa", "cancelada", "completada"];
    if (!estadosValidos.includes(nuevoEstado)) {
        return res.status(400).json({ mensaje: `El estado '${nuevoEstado}' no es válido.` });
    }

    const compraActualizada = await actualizarEstadoCompra(idVenta, nuevoEstado);
    if (!compraActualizada) {
        return res.status(404).json({ mensaje: "Compra no encontrada o no se pudo actualizar." });
    }
    res.json(compraActualizada); // Devolver la compra actualizada
});



// Ruta para agregar una nueva compra
rutas.post("/nuevaCompra", async (req, res) => { 
    try {
        const compraValida = await nuevaCompra(req.body);
        if (compraValida) {
            res.status(201).json({ message: "Compra registrada con éxito" });
        } else {
            res.status(400).json({ message: "No se pudo registrar la compra, verifique los datos." });
        }
    } catch (error) {
        console.error("Error al registrar la compra:", error);
        res.status(500).json({ message: "Error en el servidor al procesar la compra." });
    }
});

rutas.put("/editarCompra/:idVenta", async (req, res) => {
    const { idVenta } = req.params;
    const { idCliente, idProducto, cantidad } = req.body;

    try {
        const compraActualizada = await editarCompra(idVenta, { idCliente, idProducto, cantidad });
        
        if (!compraActualizada) {
            return res.status(404).json({ mensaje: "Compra no encontrada o no se pudo actualizar." });
        }
        
        res.json({ mensaje: "Compra actualizada con éxito", compra: compraActualizada });
    } catch (error) {
        console.error("Error al actualizar la compra:", error);
        res.status(500).json({ mensaje: "Error en el servidor al actualizar la compra." });
    }
});
module.exports = rutas;
