const readline = require('node:readline/promises');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});


let productos = [
    { nombre: "Cafe del dia", precio: 30, disponible: true },
    { nombre: "Capuchino", precio: 50, disponible: true },
    { nombre: "Pan dulce", precio: 10, disponible: true }
];

const promociones = [
    "Todos los Jueves 2X1 en Capuchinos",
    "Todos los Viernes Pan dulce a mitad de precio"
];

let miPedido = [];

function mostrarMenu() {
    console.log("---MENU---");
    const menu = productos.map(p => `${p.nombre} - $${p.precio}`);
    menu.forEach(linea => console.log(linea));
}
function monstrarDispo() {
    console.log("---Disponible---");
    productos.forEach(p => {
        if (p.disponible) {
            console.log(p.nombre);

        }
    }
    );
}

function mostrarPromo() {
    console.log("---PROMOCIONES---");
    promociones.forEach(promo => console.log(promo));

}

function agregarProdu(nombre, precio) {
    productos.push({nombre: nombre, precio: precio, disponible: true });
    console.log(`Producto agregado: ${nombre} - $${precio}`);
}

function crearPedido(nombreProducto, cantidad) {
    let encontrado = false;

    productos.forEach(p => {
        if (p.nombre.toLowerCase() == nombreProducto.toLowerCase()) {
            encontrado = true;
    }
    });

if (!encontrado) {
    console.log("Ese producto no exixte en el menu.");
    return;
}

miPedido.push({producto: nombreProducto, cantidad: cantidad });
console.log(`Pedido creado: ${cantidad}x ${nombreProducto}`);
    
}

function listarMisPedidos() {
    console.log("---Mis Pedidos---");
    miPedido.forEach(p => {
        console.log(`${p.cantidad}x ${p.producto}`);
    });
}

async function iniciar() {
  let salir = false;
 
  while (!salir) {
    console.log("\n===== CAFETERIA =====");
    console.log("1. Ver menu");
    console.log("2. Ver disponibles");
    console.log("3. Ver promociones");
    console.log("4. Agregar producto nuevo");
    console.log("5. Crear pedido");
    console.log("6. Ver mis pedidos");
    console.log("7. Salir");

    const opcion = await rl.question("Elige una opcion: ");

    if (opcion == "1") {
        mostrarMenu();
    } else if (opcion === "2") {
        monstrarDispo();
    } else if (opcion === "3") {
        mostrarPromo();
    } else if (opcion === "4") {
        const nombre = await rl.question("Nombre del producto nuevo: ");
        const precioTexto = await rl.question("Precio: ");
        agregarProdu(nombre, Numbre(precioTexto));
    } else if (opcion === "5") {
        const nombreProducto = await rl.question("Que producto quieres pedir? ")
        const cantidadTexto = await rl.question("Cuantos quieres ");
        crearPedido(nombreProducto, Number(cantidadTexto));
    } else if (opcion === "6") {
        listarMisPedidos();
    } else if (opcion === "7") {
        salir = true;
        console.log("Gracias por tu visita!");
    } else {
        console.log("Opcion no valida, intenta de nuevo.");
    }
  }

rl.close();

}

iniciar();

