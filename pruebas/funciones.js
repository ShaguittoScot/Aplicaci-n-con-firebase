// Define la función "saludar" sin parámetros
function saludar(){
    // Imprime en la consola el mensaje "Hola XD"
    console.log("Hola XD");
}

// Llama a la función "saludar"
saludar();

// Define la función "saludar2" con un parámetro opcional "nombre" que por defecto es "anonimo"
function saludar2(nombre = "anonimo"){
    // Imprime en la consola el mensaje concatenando "Hola" con el nombre recibido y "XD"
    console.log("Hola " + nombre + " XD");
}

// Llama a la función "saludar2" pasando el argumento "Juan Pérez Cruz"
saludar2("Juan Prérez Cruz");

// Define la función "saludar3" con un parámetro opcional "nombre" que por defecto es "anonimo"
function saludar3(nombre = "anonimo"){
    // Crea una variable "s" que almacena el mensaje concatenado de "Hola", el nombre recibido y "XD"
    var s = ("Hola " + nombre + " XD");
    // Retorna el mensaje almacenado en "s"
    return s;
}

// Llama a la función "saludar3" pasando el argumento "Pancho" y lo imprime en la consola
console.log(saludar3("Pancho"));



//Funcion de flecha se ejecura en el momneto 

//la función de flecha se define y asigna a la variable saludo, 
//luego es llamada inmediatamente después, lo que ejecuta su contenido (imprime "Hola").

var saludo = (nombre)=>{
    console.log("Hola " + nombre + " xd")
}
saludo("Megamailito");


var saludo2 = nombre=>{
    console.log("Hola " + nombre + " xd")
}
saludo2("Megsuk");

var saludo3 = nombre=>{
    var s=("Hola " + nombre + " xd")
    return s;
}
console.log(saludo3("Tenganito"));

var saludo4 = nombre=>{
    return "Hola "+ nombre +" xd";
}
console.log(saludo4("Tenganito"));

var saludo4 = nombre=> "Hola "+ nombre +" xd";
console.log(saludo4("Tenganito"));

var saludo5 = function(){
    console.log ("hola");
}

saludo5();


var saludo6 = () => {
    console.log ("saludo 6");
} 

var saludo7 = (nombre, s) => {
    console.log ("Hola " + nombre);
    s();
} 
saludo7("Betoven",saludo6);