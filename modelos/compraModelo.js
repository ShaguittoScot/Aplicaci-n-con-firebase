class Compra {
    constructor(data) {
        this.idVenta = data.idVenta;
        this.idCliente = data.idCliente;
        this.idProducto = data.idProducto;
        this._fecha = data.fecha;
        this._hora = data.hora;
        this.cantidad = data.cantidad;
        this._estado = data.estado;
    }

    // Setters
    set idVenta(idVenta) {
        this._idVenta = idVenta;
    }

    set idCliente(idCliente) {
        if (typeof idCliente === 'string' && idCliente.trim() !== '') {
            this._idCliente = idCliente;
        } else {
            throw new Error("El id del cliente debe ser una cadena no vacía.");
        }
    }

    set idProducto(idProducto) {
        if (typeof idProducto === 'string' && idProducto.trim() !== '') {
            this._idProducto = idProducto;
        } else {
            throw new Error("El id del producto debe ser una cadena no vacía.");
        }
    }

    set fecha(fecha) {
        console.log("Asignando fecha:", fecha);
        if (fecha) {
            this._fecha = fecha;
        } else {
            throw new Error('Fecha inválida');
        }
    }
    
    set hora(hora) {
        console.log("Asignando hora:", hora);

        if (hora) {
            this._hora = hora;
        } else {
            throw new Error('Hora inválida');
        }
    }

    set cantidad(cantidad) {
        let cantidadNumerica = parseInt(cantidad, 10);
        if (!isNaN(cantidadNumerica) && cantidadNumerica > 0) {
            this._cantidad = cantidadNumerica;
        } else {
            throw new Error("La cantidad debe ser un número positivo");
        }
    }

    set estado(estado) {
        const estadosValidos = ["activa", "cancelada", "completada"];
        //si el estado es válido
        if (estadosValidos.includes(estado)) {
            this._estado = estado;
        } else {
            throw new Error(`El estado '${estado}' no es válido`);
        }
    }


    // Getters
    get idVenta() {
        return this._idVenta;
    }
        
    get idCliente() {
        return this._idCliente;
    }

    get idProducto() {
        return this._idProducto;
    }

    get fecha() {
        return this._fecha;
    }
    get hora() {
        return this._hora;
    }
    get cantidad() {
        return this._cantidad;
    }
    get estado() {
        return this._estado;
    }

    // Método para obtener los datos de la compra
    getCompra() {
        const compraConId = {
            idVenta: this.idVenta,
            idCliente: this.idCliente,
            idProducto: this.idProducto,
            fecha: this.fecha,
            hora: this.hora,
            cantidad: this.cantidad,
            estado: this.estado
        };

        const compraSinId = {
            idCliente: this.idCliente,
            idProducto: this.idProducto,
            fecha: this.fecha,
            hora: this.hora,
            cantidad: this.cantidad,
            estado: this.estado
        };
        if (this.idVenta == undefined){
            return compraSinId;
        }  else  {
            return compraConId;
        }
    }
}

module.exports = Compra;
