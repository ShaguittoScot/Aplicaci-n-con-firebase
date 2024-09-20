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
    //console.log(usuarios);
    usuariosValidos = [];
    usuarios.forEach(usuario => {
        //console.log("Datos del usuario recuperados de Firestore:", usuario.data());
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validarDatos(usuario1.getUsuario())) {
            usuariosValidos.push(usuario.data());
        }
        //console.log("Usuarios válidos:", usuariosValidos);
    });
    return usuariosValidos;
}



async function buscarPorId(id) {
    const usuario = await usuariosBD.doc(id).get();
    const usuario1 = new Usuario({id: usuario.id, ...usuario.data()});
    //console.log(usuario1.getUsuario());
    var usuarioValido;
    if (validarDatos(usuario1.getUsuario())){
        usuarioValido = usuario1.getUsuario();
    }
    return usuarioValido;
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
    borrarUsuario
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