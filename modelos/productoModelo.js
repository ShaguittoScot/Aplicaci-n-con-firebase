class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
        this.descripcion = data.descripcion;
    }

    set id(id) {
        this._id = id;
    }

    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        const regexNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
        if (regexNombre.test(nombre)) {
            this._nombre = nombre;
        } else {
            throw new Error("Nombre no válido");
        }
    }   

    set cantidad(cantidad) {
        //console.log("Producto cantidad:",cantidad)
        // cantidad entero positivo
        if (Number.isInteger(cantidad) && cantidad >= 0) {
            this._cantidad = cantidad;
        } else {
            throw new Error("cantidad no valido ");
        }
    }

    set precio(precio) {
        // precio numero 2 decimales
        if (typeof precio === 'number' && !isNaN(precio) && precio >= 0) {
            this._precio = parseFloat(precio.toFixed(2)); // Redondea a 2 decimales
        } else {
            throw new Error("Precio no valido ");
        }
    }

    set descripcion(descripcion) {
        var regexDescripcion = /^.{1,200}$/;
        if (regexDescripcion.test(descripcion)) {
            this._descripcion = descripcion;
        }
    }

    get nombre() {
        return this._nombre;
    }

    get cantidad() {
        return this._cantidad;
    }

    get precio() {
        return this._precio;
    }

    get id() {
        return this._id;
    }

    get descripcion() {
        return this._descripcion;
    }


    editarDatos(nuevosDatos) {
        if (nuevosDatos.nombre !== undefined) this.nombre = nuevosDatos.nombre;
        if (nuevosDatos.cantidad !== undefined) this.cantidad = nuevosDatos.cantidad;
        if (nuevosDatos.precio !== undefined) this.precio = nuevosDatos.precio;
        if (nuevosDatos.descripcion !== undefined) this.descripcion = nuevosDatos.descripcion;
    }

    getProducto() {
        const conId = {
            id: this.id,
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio,
            descripcion: this.descripcion
        };

        const sinId = {
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio,
            descripcion: this.descripcion
        };

        if (this.id === undefined) {
            return sinId;
        } else {
            return conId;
        }
    }
}

module.exports = Producto;
