var crypto = require("crypto");

function encriptarPass(password){
    var salt = crypto.randomBytes(32).toString("hex");
    //console.log(salt);
    const hash = crypto.scryptSync(password,salt,10000,64,"sha512").toString("hex");
    //console.log(hash);
    return{
        salt,
        hash
    }
}


//encriptarPass("hola");

function validarPass(pass,hash,salt){
    const hashValidar = crypto.scryptSync(password,salt,10000,64,"sha512").toString("hex");
   
    return hashValidar==hash;
}

function usuarioAutorizado(){
    var autorizado = false;

    return autorizado;
}

function adminAutorizado(){
    var autorizado = false;

    return autorizado;
}

module.exports = {
    encriptarPass,
    validarPass,
    usuarioAutorizado,
    adminAutorizado
}