const usuariosBD = require("./conexion").usuarios;
const { encriptarPass } = require("../midleware/funcPass");
const Usuario = require("../modelos/usuarioModelo")
//console.log(usuariosBD);


function validarDatos(usuario) {
    var valido = false
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {
        valido = true;
    }
    return valido;
}



async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    console.log(usuarios);
    usuariosValidos = [];
    usuarios.forEach(usuario => {
        //console.log("Datos del usuario recuperados de Firestore:", usuario.data());
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validarDatos(usuario1.getUsuario())) {
            usuariosValidos.push({id: usuario.id, ...usuario.data()});
        }
        //console.log("Usuarios válidos:", usuariosValidos);
    });
    return usuariosValidos;
}



async function buscarPorId(id) {
    console.log("ID recibido:", id);
    const usuarioDoc = await usuariosBD.doc(id).get();

    // Verifica si el documento existe
    if (!usuarioDoc.exists) {
        console.error(`Usuario no encontrado con ID: ${id}`);
        return null; // O lanza un error si lo prefieres
    }

    const usuario1 = new Usuario({ id: usuarioDoc.id, ...usuarioDoc.data() });

    // Verificar si los datos del usuario son válidos
    if (validarDatos(usuario1.getUsuario())) {
        return usuario1.getUsuario(); // Retorna sólo si el usuario es válido
    } else {
        console.error(`Datos de usuario no válidos para ID: ${id}`);
        return null; // O lanza un error si lo prefieres
    }
}


async function nuevoUsuario(data) {
    const {salt,hash} = encriptarPass(data.password);
    data.password = hash;
    //console.log(data.password);
    data.salt = salt;
    data.tipoUsuario = "usuario"; 
    const usuario1 = new Usuario(data);
    console.log(usuario1.getUsuario())
    var usuarioValido = false;
    if (validarDatos (usuario1.getUsuario())){
        await usuariosBD.doc().set(usuario1.getUsuario());
         usuarioValido = true;
    }
    /*const datosUsuario = usuario1.getUsuario();
    console.log("Datos del usuario a guardar en Firestore:", datosUsuario);
    console.log(usuario1.getUsuario());
    await usuariosBD.doc().set(datosUsuario);*/
    return usuarioValido;
}

async function editarUsuario(idUsuario, nuevosDatos) {
    try {
        // Primero obtén el usuario desde Firestore
        const usuarioRef = await usuariosBD.doc(idUsuario).get();

        if (!usuarioRef.exists) {
            return { success: false, message: "Usuario no encontrado" };
        }

        const usuarioData = usuarioRef.data();
        const usuario = new Usuario(usuarioData);

        // Si el nuevo objeto incluye una contraseña, la encriptamos
        if (nuevosDatos.password) {
            const { salt, hash } = encriptarPass(nuevosDatos.password);
            nuevosDatos.password = hash; // Actualizamos la contraseña con el hash encriptado
            nuevosDatos.salt = salt;     // Guardamos el salt generado
        }

        // Editar los datos del usuario
       usuario.editarDatos(nuevosDatos);

        // Guardar los nuevos datos en Firestore
        await usuariosBD.doc(idUsuario).update(usuario.getUsuario());

        return { success: true, message: "Usuario actualizado exitosamente" };
    } catch (error) {
        console.error("Error al editar el usuario:", error);
        return { success: false, message: "Error al actualizar el usuario" };
    }
}



/*data = {
    nombre: "Bethoveen",
    usuario: "Musicoss",
    password: "bethoven123@G"
}*/

//nuevoUsuario(data);


async function borrarUsuario(id) {
    var usuarioValido = await buscarPorId(id);
    var usuarioBorrado = false;
    if(usuarioValido) {
        await usuariosBD.doc(id).delete();
        usuarioBorrado = true
    }
    return usuarioBorrado;

}


module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    validarDatos,
    buscarPorId,
    borrarUsuario,
    editarUsuario
}








/*async function mostrarUsuarios() {
    try {
        const usuarios = await usuariosBD.get();
        const listaUsuarios = [];

        usuarios.forEach(usuario => {
            console.log("Datos del usuario recuperados de Firestore:", usuario.data());
            const validar = new Usuario({ id: usuario.id, ...usuario.data() });
            console.log("Instancia de Usuario creada:", validar);
            listaUsuarios.push(usuario.data());
        });

        console.log("Total de usuarios recuperados:", listaUsuarios.length);

    } catch (error) {
        console.error("Error al recuperar los usuarios:", error);
    }
        } */