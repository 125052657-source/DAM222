const readline = require('node:readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let productos = [
    { id: 1, nombre: "Cafe del dia", precio: 30, categoria: "Bebida", disponible: true },
    { id: 2, nombre: "Capuchino", precio: 50, categoria: "Bebida", disponible: true },
    { id: 3, nombre: "Cafe con azucar", precio: 35, categoria: "Bebida", disponible: true },
    { id: 4, nombre: "Pan dulce", precio: 10, categoria: "Postre", disponible: true }
];

const promociones = [
    "Todos los Jueves 2X1 en Capuchinos",
    "Todos los Viernes Pan dulce a mitad de precio"
];

let ingredientes = {
    cafe: 5,
    agua: 10,
    leche: 5,
    azucar: 5
};

let pedidos = [];
let contadorPedidoId = 1;
let contadorProductoId = productos.length + 1;

const IVA = 0.16;

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function prepararProducto(pedido) {
    const nombre = pedido.producto.toLowerCase();

    if (nombre === "cafe del dia") {
        if (ingredientes.cafe <= 0) throw new Error("No hay cafe.");
        if (ingredientes.agua <= 0) throw new Error("No hay agua.");
        console.log(`[Pedido #${pedido.id}] Moliendo cafe...`);
        await esperar(1500);
        console.log(`[Pedido #${pedido.id}] Agregando agua...`);
        await esperar(1500);
        ingredientes.cafe--;
        ingredientes.agua--;

    } else if (nombre === "capuchino") {
        if (ingredientes.cafe <= 0) throw new Error("No hay cafe.");
        if (ingredientes.agua <= 0) throw new Error("No hay agua.");
        if (ingredientes.leche <= 0) throw new Error("No hay leche.");
        console.log(`[Pedido #${pedido.id}] Moliendo cafe...`);
        await esperar(1500);
        console.log(`[Pedido #${pedido.id}] Agregando agua y leche...`);
        await esperar(1500);
        ingredientes.cafe--;
        ingredientes.agua--;
        ingredientes.leche--;

    } else if (nombre === "cafe con azucar") {
        if (ingredientes.cafe <= 0) throw new Error("No hay cafe.");
        if (ingredientes.agua <= 0) throw new Error("No hay agua.");
        if (ingredientes.azucar <= 0) throw new Error("No hay azucar.");
        console.log(`[Pedido #${pedido.id}] Moliendo cafe...`);
        await esperar(1500);
        console.log(`[Pedido #${pedido.id}] Agregando agua y azucar...`);
        await esperar(1500);
        ingredientes.cafe--;
        ingredientes.agua--;
        ingredientes.azucar--;

    } else {
        console.log(`[Pedido #${pedido.id}] Preparando ${pedido.producto}...`);
        await esperar(1000);
    }
}

async function procesarPedido(pedido, callback) {
    try {
        pedido.estado = "Preparando";
        console.log(`\n[Pedido #${pedido.id}] -> ${pedido.estado}`);
        await prepararProducto(pedido);

        pedido.estado = "Empacando";
        console.log(`\n[Pedido #${pedido.id}] -> ${pedido.estado}`);
        await esperar(1000 + Math.floor(Math.random() * 1000));

        pedido.estado = "Pedido Entregado";
        callback(null, pedido);

    } catch (error) {
        pedido.estado = "Cancelado";
        callback(error, pedido);
    }
}

function mostrarIngredientes() {
    console.log("\n--- INGREDIENTES DISPONIBLES ---");
    console.log(`Cafe: ${ingredientes.cafe}`);
    console.log(`Agua: ${ingredientes.agua}`);
    console.log(`Leche: ${ingredientes.leche}`);
    console.log(`Azucar: ${ingredientes.azucar}`);
}

async function agregarIngredientes() {
    console.log("\n--- AGREGAR INGREDIENTES ---");
    console.log("1. Cafe");
    console.log("2. Agua");
    console.log("3. Leche");
    console.log("4. Azucar");
    const opcion = await rl.question("Seleccione un ingrediente: ");
    const cantidad = Number(await rl.question("Cantidad a agregar: "));

    if (isNaN(cantidad) || cantidad <= 0) {
        console.log("La cantidad debe ser mayor que 0.");
        return;
    }

    if (opcion === "1") ingredientes.cafe += cantidad;
    else if (opcion === "2") ingredientes.agua += cantidad;
    else if (opcion === "3") ingredientes.leche += cantidad;
    else if (opcion === "4") ingredientes.azucar += cantidad;
    else { console.log("Opcion no valida."); return; }

    console.log(`Se agregaron ${cantidad} unidades.`);
}

async function agregarProducto() {
    const nombre = await rl.question("Nombre del producto nuevo: ");
    if (nombre.trim() === "") { console.log("El nombre no puede estar vacio."); return; }

    const precio = Number(await rl.question("Precio: "));
    if (isNaN(precio) || precio <= 0) { console.log("El precio debe ser mayor que 0."); return; }

    const categoria = await rl.question("Categoria (Bebida/Postre): ");
    if (categoria !== "Bebida" && categoria !== "Postre") {
        console.log("La categoria debe ser Bebida o Postre.");
        return;
    }

    productos.push({ id: contadorProductoId++, nombre, precio, categoria, disponible: true });
    console.log(`Producto agregado: ${nombre} - $${precio}`);
}

function listarProductos() {
    console.log("\n---- PRODUCTOS ----");
    productos.forEach(p => {
        console.log(`ID: ${p.id} | ${p.nombre} | $${p.precio} | ${p.categoria} | Disponible: ${p.disponible ? "Si" : "No"}`);
    });
}

function mostrarMenu() {
    console.log("\n---MENU---");
    productos.forEach(p => console.log(`${p.nombre} - $${p.precio}`));
}

function mostrarDisponibles() {
    console.log("\n---Disponible---");
    productos.forEach(p => { if (p.disponible) console.log(p.nombre); });
}

function mostrarPromo() {
    console.log("\n---PROMOCIONES---");
    promociones.forEach(promo => console.log(promo));
}

function notificarResultado(error, pedido) {
    if (error) {
        console.log(`\n[NOTIFICACION] Pedido #${pedido.id} (${pedido.cliente}) cancelado: ${error.message}`);
        return;
    }
    console.log(`\n[NOTIFICACION] Pedido #${pedido.id} listo: ${pedido.cantidad}x ${pedido.producto} para ${pedido.cliente}`);
}

function crearPedido(cliente, nombreProducto, cantidad) {
    const producto = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());

    if (!producto) { console.log("Ese producto no existe en el menu."); return; }
    if (!producto.disponible) { console.log("Ese producto no esta disponible por el momento."); return; }
    if (isNaN(cantidad) || cantidad <= 0) { console.log("La cantidad debe ser mayor que 0."); return; }

    const nuevoPedido = {
        id: contadorPedidoId++,
        cliente,
        producto: producto.nombre,
        precio: producto.precio,
        cantidad,
        estado: "Pedido recibido"
    };

    pedidos.push(nuevoPedido);
    console.log(`Pedido creado: #${nuevoPedido.id} - ${cantidad}x ${producto.nombre} -> ${nuevoPedido.estado}`);

    procesarPedido(nuevoPedido, notificarResultado);
}

function listarMisPedidos(cliente) {
    console.log(`\n--- Pedidos de ${cliente} ---`);
    const propios = pedidos.filter(p => p.cliente.toLowerCase() === cliente.toLowerCase());

    if (propios.length === 0) {
        console.log("Aun no tienes pedidos.");
        return;
    }
    propios.forEach(p => console.log(`#${p.id} - ${p.cantidad}x ${p.producto} -> ${p.estado}`));
}

function listarPedidos() {
    console.log("\n--- TODOS LOS PEDIDOS ---");
    if (pedidos.length === 0) { console.log("No hay pedidos."); return; }
    pedidos.forEach(p => {
        console.log(`#${p.id} - ${p.cliente} pidio ${p.cantidad}x ${p.producto} -> ${p.estado}`);
    });
}

function calcularTotal() {
    const entregados = pedidos.filter(p => p.estado === "Pedido Entregado");
    const subtotal = entregados.reduce((total, p) => total + (p.cantidad * p.precio), 0);
    const iva = subtotal * IVA;
    const total = subtotal + iva;
    return { subtotal, iva, total };
}

function mostrarResumen() {
    const { subtotal, iva, total } = calcularTotal();
    console.log("\n--- TOTAL ACUMULADO (solo pedidos ya entregados) ---");
    console.log(`Subtotal: $${subtotal}`);
    console.log(`IVA: $${iva.toFixed(2)}`);
    console.log(`Total: $${total.toFixed(2)}`);
}

async function menuCliente() {
    let volver = false;
    while (!volver) {
        console.log("\n===== CLIENTE =====");
        console.log("1. Ver menu");
        console.log("2. Ver disponibles");
        console.log("3. Ver promociones");
        console.log("4. Crear pedido");
        console.log("5. Ver mis pedidos");
        console.log("6. Volver al menu principal");

        const opcion = await rl.question("Elige una opcion: ");

        if (opcion === "1") mostrarMenu();
        else if (opcion === "2") mostrarDisponibles();
        else if (opcion === "3") mostrarPromo();
        else if (opcion === "4") {
            const cliente = await rl.question("Cual es tu nombre? ");
            const nombreProducto = await rl.question("Que producto quieres pedir? ");
            const cantidad = Number(await rl.question("Cuantos quieres? "));
            crearPedido(cliente, nombreProducto, cantidad);
        } else if (opcion === "5") {
            const cliente = await rl.question("Cual es tu nombre? ");
            listarMisPedidos(cliente);
        } else if (opcion === "6") {
            volver = true;
        } else {
            console.log("Opcion no valida, intenta de nuevo.");
        }
    }
}

async function menuCaja() {
    let volver = false;
    while (!volver) {
        console.log("\n===== CAJA =====");
        console.log("1. Ver todos los pedidos");
        console.log("2. Ver total acumulado");
        console.log("3. Volver al menu principal");

        const opcion = await rl.question("Elige una opcion: ");

        if (opcion === "1") listarPedidos();
        else if (opcion === "2") mostrarResumen();
        else if (opcion === "3") volver = true;
        else console.log("Opcion no valida, intenta de nuevo.");
    }
}

async function menuCocina() {
    let volver = false;
    while (!volver) {
        console.log("\n===== COCINA =====");
        console.log("1. Agregar producto");
        console.log("2. Listar productos");
        console.log("3. Revisar ingredientes");
        console.log("4. Agregar ingredientes");
        console.log("5. Volver al menu principal");

        const opcion = await rl.question("Elige una opcion: ");

        if (opcion === "1") await agregarProducto();
        else if (opcion === "2") listarProductos();
        else if (opcion === "3") mostrarIngredientes();
        else if (opcion === "4") await agregarIngredientes();
        else if (opcion === "5") volver = true;
        else console.log("Opcion no valida, intenta de nuevo.");
    }
}

async function iniciar() {
    let salir = false;

    console.log("       CAFETERIA UPQ");
    console.log("================================");

    while (!salir) {
        console.log("\n===== MENU PRINCIPAL =====");
        console.log("1. Cliente");
        console.log("2. Caja");
        console.log("3. Cocina");
        console.log("4. Salir");

        const opcion = await rl.question("Elige una opcion: ");

        if (opcion === "1") await menuCliente();
        else if (opcion === "2") await menuCaja();
        else if (opcion === "3") await menuCocina();
        else if (opcion === "4") {
            salir = true;
            console.log("Hasta luego!");
        } else {
            console.log("Opcion no valida, intenta de nuevo.");
        }
    }

    rl.close();
}

iniciar();