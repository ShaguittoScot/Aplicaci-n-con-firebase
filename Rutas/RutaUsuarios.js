var rutas = require("express").Router();
var {mostrarUsuarios,nuevoUsuario,validarDatos,borrarUsuario,mostrarUsuarios,buscarPorId,editarUsuario} = require("../bd/usuariosBD");
const {encriptarPass,validarPass,usuarioAutorizado,adminAutorizado} = require("../midleware/funcPass")


rutas.get("/",async (req,res) =>{
    //res.send("Hola etas en raiz");
    var usuarisValidos = await mostrarUsuarios();
    //console.log(usuarisValidos);
    res.json(usuarisValidos);
});

rutas.get("/buscarUsuarioPorId/:id", async(req,res) => {
    console.log("id recibido:",req.params.id)
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

rutas.put("/editarUsuario/:id", async (req, res) => {
    const idUsuario = req.params.id;
    const nuevosDatos = req.body;
    const resultado = await editarUsuario(idUsuario, nuevosDatos);

    if (resultado.success) {
        res.status(200).json(resultado);
    } else {
        res.status(400).json(resultado);
    }
});


module.exports = rutas;