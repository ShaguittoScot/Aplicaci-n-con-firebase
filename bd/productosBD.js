const productosBD = require("./conexion").productos;
const Producto = require("../modelos/productoModelo")

function validarDatos(producto) {
    var valido = false
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio!= undefined && producto.descripcion != undefined ) {
        valido = true;
    }
    return valido;
}



async function mostrarProductos() {
    const productos = await productosBD.get();
    productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarDatos(producto1.getProducto())) {
            productosValidos.push(producto.data());
        }
    });
    return productosValidos;
}



async function buscarPorId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({id: producto.id, ...producto.data()});
    var productoValido;
    if (validarDatos(producto1.getProducto())){
        productoValido = producto1.getProducto();
    }
    return productoValido;
}


async function nuevoProducto(data) {
    console.log(data);

    const producto1 = new Producto(data);
    console.log(producto1.getProducto())
    var productoValido = false;
    if (validarDatos (producto1.getProducto())){
        await productosBD.doc().set(producto1.getProducto());
        productoValido = true;
    }
    return productoValido;
}



async function borrarProducto(id) {
    var productoValido = await buscarPorId(id);
    var productoBorrado = false;
    if(productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado = true
    }
    return productoBorrado;

}


module.exports = {
    mostrarProductos,
    nuevoProducto,
    buscarPorId,
    borrarProducto
}
