const readline = require('node:readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let productos = [
    { nombre: "Cafe del dia", precio: 30, categoria: "Bebida", disponible: true },
    { nombre: "Capuchino", precio: 50, categoria: "Bebida", disponible: true },
    { nombre: "Cafe con azucar", precio: 35, categoria: "Bebida", disponible: true },
    { nombre: "Pan dulce", precio: 10, categoria: "Postre", disponible: true }
];

const promociones = [
    "Todos los Jueves 2X1 en Capuchinos",
    "Todos los Viernes Pan dulce a mitad de precio"
];

let pedidos = [];
let contadorId = 1;

const ESTADOS = ["Pedido recibido", "Preparando", "Empacando", "Pedido Entregado"];

function mostrarMenu() {
    console.log("\n---MENU---");
    const lineasMenu = productos.map(p => `${p.nombre} - $${p.precio} (${p.categoria})`);
    lineasMenu.forEach(linea => console.log(linea));
}

function mostrarDisponibles() {
    console.log("\n---Disponible---");
    productos.forEach(p => {
        if (p.disponible) console.log(p.nombre);
    });
}

function mostrarPromo() {
    console.log("\n---PROMOCIONES---");
    promociones.forEach(promo => console.log(promo));
}

function avanzarEstado(pedido) {
    const indiceActual = ESTADOS.indexOf(pedido.estado);

    if (pedido.estado === "Pedido Entregado" || pedido.estado === "Cancelado") {
        return;
    }

    const demora = 2000 + Math.floor(Math.random() * 3000); 

    setTimeout(() => {
        const seCancela = Math.random() < 0.1; 

        if (seCancela) {
            pedido.estado = "Cancelado";
            console.log(`\n[Pedido #${pedido.id}] ${pedido.cantidad}x ${pedido.producto} -> Cancelado`);
            return;
        }

        const siguienteEstado = ESTADOS[indiceActual + 1];
        pedido.estado = siguienteEstado;
        console.log(`\n[Pedido #${pedido.id}] ${pedido.cantidad}x ${pedido.producto} -> ${siguienteEstado}`);

        if (siguienteEstado !== "Pedido Entregado") {
            avanzarEstado(pedido);
        }
    }, demora);
}

function crearPedido(cliente, nombreProducto, cantidad) {
    const producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());

    if (!producto) { console.log("Ese producto no existe en el menu."); return; }
    if (!producto.disponible) { console.log("Ese producto no esta disponible por el momento."); return; }
    if (isNaN(cantidad) || cantidad <= 0) { console.log("La cantidad debe ser mayor que 0."); return; }

    const nuevoPedido = {
        id: contadorId++,
        cliente,
        producto: producto.nombre,
        cantidad,
        estado: "Pedido recibido"
    };

    pedidos.push(nuevoPedido);
    console.log(`Pedido creado: #${nuevoPedido.id} - ${cantidad}x ${producto.nombre} -> ${nuevoPedido.estado}`);

    avanzarEstado(nuevoPedido);
}

function listarMisPedidos(cliente) {
    console.log(`\n--- Pedidos de ${cliente} ---`);
    const propios = pedidos.filter(p => p.cliente.toLowerCase() === cliente.toLowerCase());

    if (propios.length === 0) { console.log("Aun no tienes pedidos."); return; }
    propios.forEach(p => console.log(`#${p.id} - ${p.cantidad}x ${p.producto} -> ${p.estado}`));
}

async function iniciar() {
    let salir = false;

    while (!salir) {
        console.log("\n===== CLIENTE =====");
        console.log("1. Ver menu");
        console.log("2. Ver disponibles");
        console.log("3. Ver promociones");
        console.log("4. Crear pedido");
        console.log("5. Ver mis pedidos");
        console.log("6. Salir");

        const opcion = await rl.question("Elige una opcion: ");

        if (opcion === "1") {
            mostrarMenu();
        } else if (opcion === "2") {
            mostrarDisponibles();
        } else if (opcion === "3") {
            mostrarPromo();
        } else if (opcion === "4") {
            const cliente = await rl.question("Cual es tu nombre? ");
            const nombreProducto = await rl.question("Que producto quieres pedir? ");
            const cantidadTexto = await rl.question("Cuantos quieres? ");
            crearPedido(cliente, nombreProducto, Number(cantidadTexto));
        } else if (opcion === "5") {
            const cliente = await rl.question("Cual es tu nombre? ");
            listarMisPedidos(cliente);
        } else if (opcion === "6") {
            salir = true;
            console.log("Gracias por tu visita!");
        } else {
            console.log("Opcion no valida, intenta de nuevo.");
        }
    }

    rl.close();
}

iniciar();