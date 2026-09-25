const readline = require('node:readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const IVA = 0.16;

let pedidos = [];
let contadorId = 1;

function procesarPedidoConCallback(pedido, callback) {
    const demora = 2000 + Math.floor(Math.random() * 3000); 

    setTimeout(() => {
        const seCancela = Math.random() < 0.15; 

        if (seCancela) {
            pedido.estado = "Cancelado";
            callback(new Error(`Pedido cancelado: ${pedido.cantidad}x ${pedido.producto} (${pedido.cliente})`), pedido);
            return;
        }

        pedido.estado = "Listo";
        callback(null, pedido);
    }, demora);
}

function notificarResultado(error, pedido) {
    if (error) {
        console.log(`\n[NOTIFICACION] ${error.message}`);
        return;
    }
    console.log(`\n[NOTIFICACION] Pedido listo: ${pedido.cantidad}x ${pedido.producto} para ${pedido.cliente}`);
}

function agregarPedido(cliente, producto, cantidad, precio) {
    if (isNaN(cantidad) || cantidad <= 0) { console.log("La cantidad debe ser mayor que 0."); return; }
    if (isNaN(precio) || precio <= 0) { console.log("El precio debe ser mayor que 0."); return; }

    const nuevoPedido = {
        id: contadorId++,
        cliente,
        producto,
        cantidad,
        precio,
        estado: "Pedido recibido"
    };

    pedidos.push(nuevoPedido);
    console.log(`Pedido agregado: #${nuevoPedido.id} - ${cantidad}x ${producto} para ${cliente}`);
    procesarPedidoConCallback(nuevoPedido, notificarResultado);
}

function listarPedidos() {
    console.log("\n--- LISTA DE PEDIDOS ---");
    if (pedidos.length === 0) { console.log("No hay pedidos."); return; }

    pedidos.forEach((pedido, i) => {
        const { cliente, producto, cantidad, precio, estado } = pedido; 
        const subtotal = cantidad * precio;
        console.log(`${i + 1}. ${cliente} pidio ${cantidad}x ${producto} = $${subtotal} [${estado}]`);
    });
}

function calcularTotal() {
    const subtotal = pedidos.reduce((total, pedido) => total + (pedido.cantidad * pedido.precio), 0);
    const iva = subtotal * IVA;
    const total = subtotal + iva;

    return { subtotal, iva, total };
}

function mostrarResumen() {
    const { subtotal, iva, total } = calcularTotal(); 
    console.log("\n--- TOTAL ACUMULADO ---");
    console.log(`Subtotal: $${subtotal}`);
    console.log(`IVA: $${iva.toFixed(2)}`);
    console.log(`Total: $${total.toFixed(2)}`);
}

async function iniciar() {
    let salir = false;

    while (!salir) {
        console.log("\n===== CAJA =====");
        console.log("1. Ver pedidos");
        console.log("2. Agregar pedido");
        console.log("3. Ver total acumulado");
        console.log("4. Salir");

        const opcion = await rl.question("Elige una opcion: ");

        if (opcion === "1") {
            listarPedidos();
        } else if (opcion === "2") {
            const cliente = await rl.question("Nombre del cliente: ");
            const producto = await rl.question("Producto: ");
            const cantidadTexto = await rl.question("Cantidad: ");
            const precioTexto = await rl.question("Precio unitario: ");
            agregarPedido(cliente, producto, Number(cantidadTexto), Number(precioTexto));
        } else if (opcion === "3") {
            mostrarResumen();
        } else if (opcion === "4") {
            salir = true;
            console.log("Cerrando caja...");
        } else {
            console.log("Opcion no valida, intenta de nuevo.");
        }
    }

    rl.close();
}

iniciar();