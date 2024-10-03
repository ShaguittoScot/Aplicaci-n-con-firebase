const comprasBD = require("./conexion").compras;
const productosBD = require("./conexion").productos;
const buscarProductoPorId = require("../bd/productosBD").buscarPorId;
const buscarUsuarioPorId = require("../bd/usuariosBD").buscarPorId;
const Compra = require("../modelos/compraModelo");

function validarDatosCompra(compra) {
    var valido = false;
    if (compra.idCliente != undefined && compra.idProducto != undefined && compra.cantidad != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarCompras() {
    const comprasSn = await comprasBD.get();
    const comprasValidas = [];

    for (const doc of comprasSn.docs) {
        const compra = new Compra({ idVenta: doc.id, ...doc.data() });

        // Validar los datos de la compra
        if (validarDatosCompra(compra.getCompra())) {
            const clienteId = compra.idCliente;
            const productoId = compra.idProducto;

            // Obtener nombre del cliente usando la función buscarPorId
            const cliente = await buscarUsuarioPorId(clienteId);
            let nombreCliente;
            if (cliente) {
                nombreCliente = cliente.nombre;
            } else {
                nombreCliente = "Cliente no encontrado";
            }

            // Obtener nombre del producto usando la función buscarPorId
            const producto = await buscarProductoPorId(productoId);
            let nombreProducto;
            if (producto) {
                nombreProducto = producto.nombre;
            } else {
                nombreProducto = "Producto no encontrado";
            }

            // Agregar la compra con los nombres
            comprasValidas.push({
                fecha: compra.fecha,
                Cliente: nombreCliente,
                Producto: nombreProducto,
                cantidad: compra.cantidad,
                estado: compra.estado
            });
        }
    }
    return comprasValidas;
}

async function buscarCompraPorId(idVenta) {
    console.log("Buscando compra ID:", idVenta);
    const compraDoc = await comprasBD.doc(idVenta).get();
    if (!compraDoc.exists) {
        throw new Error("Compra no encontrada");
    }
    const compra1 = new Compra({ idVenta: compraDoc.id, ...compraDoc.data() });
    let compraValida = [];
    if (validarDatosCompra(compra1.getCompra())) {
        const clienteId = compra1.idCliente;
        const productoId = compra1.idProducto;
        // Nombre del cliente buscarPorId
        const cliente = await buscarUsuarioPorId(clienteId);
        let nombreCliente;
        if (cliente) {
            nombreCliente = cliente.nombre;
        } else {
            nombreCliente = "Cliente no encontrado";
        }

        // Nombre producto buscarPorId
        const producto = await buscarProductoPorId(productoId);
        let nombreProducto;
        if (producto) {
            nombreProducto = producto.nombre;
        } else {
            nombreProducto = "Producto no encontrado";
        }

        compraValida.push({
            fecha: compra1.fecha,
            Cliente: nombreCliente,
            Producto: nombreProducto,
            cantidad: compra1.cantidad,
            estado: compra1.estado
        });
    }

    return compraValida;
}

async function nuevaCompra(data) {
    const fecha = new Date();
    console.log("Fecha generada:", fecha);
    
    const fechaActual = fecha.toISOString().split('T')[0]; //formato YYYY-MM-DD
    const horaActual = fecha.toTimeString().split(' ')[0]; //formato HH:MM:SS
    console.log("Hora generada:", horaActual);

    const estado = "activa";
    const compra1 = new Compra(data);
    console.log("Compra inicial:", compra1);
    
    let compraValida = false;
    
    compra1.fecha = fechaActual;
    compra1.estado = estado;
    compra1.hora = horaActual;


    if (validarDatosCompra(compra1.getCompra())) {
        const productoId = compra1.idProducto;
        const producto = await buscarProductoPorId(productoId); //Obtener producto por ID
        //Verificar si el producto existe y si ay suficiente cantidad
        if (producto && producto.cantidad >= compra1.cantidad) {
            //Restar la cantidad del producto
            const nuevaCantidad = producto.cantidad - compra1.cantidad;
            //Actualizar el producto
            await productosBD.doc(productoId).update({ cantidad: nuevaCantidad });
            //Guardar la compra
            await comprasBD.doc().set(compra1.getCompra());
            compraValida = true;
        } else {
            console.log("No hay suficiente cantidad del producto o el producto no existe");
        }
    }

    return compraValida;
}



async function borrarCompra(idVenta) {
    const nuevoEstado = "cancelada";
    const compra = await buscarCompraPorId(idVenta);
    
    if (compra) {
        await comprasBD.doc(idVenta).update({ estado: nuevoEstado });
        console.log("Compra cancelada");
        return true;
    } else {
        console.log("Compra no encontrada");
        return false;
    }
}



module.exports = {
    mostrarCompras,
    buscarCompraPorId,
    nuevaCompra,
    borrarCompra
}
