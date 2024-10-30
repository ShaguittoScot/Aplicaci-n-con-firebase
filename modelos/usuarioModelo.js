class Usuario {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.salt = data.salt;
        this.tipoUsuario = data.tipoUsuario;
    }

    // Setter para 'id'
    set id(id) {
        this._id = id;
    }

    // Setter para 'nombre' con validación
    set nombre(nombre) {
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexNombre.test(nombre)) {
            this._nombre = nombre;
        } else {
            throw new Error("Nombre no válido");
        }
    }

    // Setter para 'usuario'
    set usuario(usuario) {
        this._usuario = usuario;
    }

    // Setter para 'password' con validación
    set password(password) {
        if (password && password.length >= 6) {
            this._password = password;
        } else {
            console.log('Contraseña recibida:', password);
            throw new Error("Contraseña no válida " + password);
        }
    }
    

    set salt(salt) {
       this._salt = salt;
    }

    set tipoUsuario(tipoUsuario) {
        this._tipoUsuario = tipoUsuario;
    }
 
    get id() {
        return this._id;
    }

    // Getter para 'nombre'
    get nombre() {
        return this._nombre;
    }

    // Getter para 'usuario'
    get usuario() {
        return this._usuario;
    }

    // Getter para 'password'
    get password() {
        return this._password;
    }

    get salt() {
        return this._salt;
     }
 
     get tipoUsuario() {
        return this._tipoUsuario;
     }


     editarDatos(nuevosDatos) {
        if (nuevosDatos.nombre) this.nombre = nuevosDatos.nombre;
        if (nuevosDatos.usuario) this.usuario = nuevosDatos.usuario;
        if (nuevosDatos.password) this.password = nuevosDatos.password;
        if (nuevosDatos.salt) this.salt = nuevosDatos.salt;
        if (nuevosDatos.tipoUsuario) this.tipoUsuario = nuevosDatos.tipoUsuario;
    }

    //Método opcional para obtener los datos del usuario
    getUsuario() {
        const conId = {
            id: this.id,
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password,
            salt: this.salt,
            tipoUsuario: this.tipoUsuario
        };
    
        const sinId = {
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password,
            salt: this.salt,
            tipoUsuario: this.tipoUsuario
        };
    
        // Usa '===' para comparar, no '=' que es asignación.
        if (this.id == undefined) {
            return sinId;
        } else {
            return conId;
        }
    }
    
}

module.exports = Usuario;
