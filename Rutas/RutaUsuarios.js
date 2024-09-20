var rutas = require("express").Router();
var {mostrarUsuarios,nuevoUsuario,validarDatos,borrarUsuario,mostrarUsuarios,buscarPorId} = require("../bd/usuariosBD");
const {encriptarPass,validarPass,usuarioAutorizado,adminAutorizado} = require("../midleware/funcPass")


rutas.get("/",async (req,res) =>{
    //res.send("Hola etas en raiz");
    var usuarisValidos = await mostrarUsuarios();
    //console.log(usuarisValidos);
    res.json(usuarisValidos);
});

rutas.get("/buscarUsuarioPorId/:id", async(req,res) => {
    var usuarioValido = await buscarPorId(req.params.id)
    //console.log (usuarioValido);
    res.json(usuarioValido);
    
});

rutas.get("/borrarUsuario/:id", async(req,res) => {
    var usuarioBBorrado = await borrarUsuario(req.params.id);
    res.json(usuarioBBorrado);
});

rutas.post("/nuevoUsuario", async (req,res) => {
    var usuarioValido = await nuevoUsuario(req.body);
    console.log(usuarioValido);
    res.json(usuarioValido);
})


module.exports = rutas;