const readline = require('node:readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let productos = [
  { id: 1, nombre: "Cafe del dia", precio: 30, categoria: "Bebida", disponible: true },
  { id: 2, nombre: "Capuchino", precio: 50, categoria: "Bebida", disponible: true },
  { id: 3, nombre: "Pan dulce", precio: 10, categoria: "Postre", disponible: true }
];

const promociones = [
  "Todos los Jueves 2X1 en Capuchinos",
  "Todos los Viernes Pan dulce a mitad de precio"
];

let pedidos = [];
const IVA = 0.16;

function agregarPedido(cliente, producto, cantidad, precio) {
  let nuevoPedido = { cliente, producto, cantidad, precio };
  pedidos.push(nuevoPedido);
  console.log(`Pedido agregado: ${cantidad}x ${producto} para ${cliente}`);
}

function listarPedidos() {
  console.log("\n--- LISTA DE PEDIDOS ---");
  pedidos.forEach((pedido, i) => {
    const { cliente, producto, cantidad, precio } = pedido;
    let subtotal = cantidad * precio;
    console.log(`${i + 1}. ${cliente} pidio ${cantidad}x ${producto} = $${subtotal}`);
  });
}

function calcularTotal() {
  let subtotal = pedidos.reduce((total, pedido) => total + (pedido.cantidad * pedido.precio), 0);
  let iva = subtotal * IVA;
  let total = subtotal + iva;

  return { subtotal, iva, total };
}

function mostrarResumen() {
  const { subtotal, iva, total } = calcularTotal();
  console.log("\n--- TOTAL ACUMULADO ---");
  console.log(`Subtotal: $${subtotal}`);
  console.log(`IVA: $${iva.toFixed(2)}`);
  console.log(`Total: $${total.toFixed(2)}`);
}

async function menuCaja() {
  let volver = false;

  while (!volver) {
    console.log("===== CAJA =====");
    console.log("1. Ver pedidos");
    console.log("2. Agregar pedido manual");
    console.log("3. Ver total acumulado");
    console.log("4. Volver al menu principal");

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
      volver = true;
    } else {
      console.log("Opcion no valida, intenta de nuevo.");
    }
  }
}

function mostrarMenu() {
  console.log("\n---MENU---");
  const menu = productos.map(p => `${p.nombre} - $${p.precio}`);
  menu.forEach(linea => console.log(linea));
}

function mostrarDispo() {
  console.log("\n---Disponible---");
  productos.forEach(p => {
    if (p.disponible) {
      console.log(p.nombre);
    }
  });
}

function mostrarPromo() {
  console.log("\n---PROMOCIONES---");
  promociones.forEach(promo => console.log(promo));
}

function sugerirProducto(nombre, precio) {
  const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
  productos.push({ id: nuevoId, nombre: nombre, precio: precio, categoria: "Otro", disponible: true });
  console.log(`Producto agregado: ${nombre} - $${precio}`);
}

function crearPedidoCliente(nombreCliente, numeroProducto, cantidad) {
  const indice = numeroProducto - 1;

  if (indice < 0 || indice >= productos.length) {
    console.log("Ese numero no existe en el menu.");
    return;
  }

  const productoElegido = productos[indice];

  if (!productoElegido.disponible) {
    console.log(`${productoElegido.nombre} no esta disponible ahorita.`);
    return;
  }

  agregarPedido(nombreCliente, productoElegido.nombre, cantidad, productoElegido.precio);
}

function listarPedidosDe(nombreCliente) {
  console.log(`\n--- PEDIDOS DE ${nombreCliente} ---`);
  pedidos.forEach(p => {
    if (p.cliente === nombreCliente) {
      console.log(`${p.cantidad}x ${p.producto}`);
    }
  });
}

async function menuCliente() {
  const nombreCliente = await rl.question("\nCual es tu nombre? ");
  let volver = false;

  while (!volver) {
    console.log("===== CAFETERIA =====");
    console.log("1. Ver menu");
    console.log("2. Ver disponibles");
    console.log("3. Ver promociones");
    console.log("4. Agregar producto nuevo");
    console.log("5. Crear pedido");
    console.log("6. Ver mis pedidos");
    console.log("7. Volver al menu principal");

    const opcion = await rl.question("Elige una opcion: ");

    if (opcion === "1") {
      mostrarMenu();
    } else if (opcion === "2") {
      mostrarDispo();
    } else if (opcion === "3") {
      mostrarPromo();
    } else if (opcion === "4") {
      const nombre = await rl.question("Nombre del producto nuevo: ");
      const precioTexto = await rl.question("Precio: ");
      sugerirProducto(nombre, Number(precioTexto));
    } else if (opcion === "5") {
      let seguirPidiendo = true;

      while (seguirPidiendo) {
        console.log("\n--- ELIGE UN PRODUCTO ---");
        productos.forEach((p, i) => {
          console.log(`${i + 1}. ${p.nombre} - $${p.precio}`);
        });

        const numeroTexto = await rl.question("Escribe el numero del producto: ");
        const cantidadTexto = await rl.question("Cuantos quieres? ");
        crearPedidoCliente(nombreCliente, Number(numeroTexto), Number(cantidadTexto));

        const otroTexto = await rl.question("Quieres agregar otro producto? (si/no): ");
        seguirPidiendo = otroTexto.toLowerCase() === "si";
      }
    } else if (opcion === "6") {
      listarPedidosDe(nombreCliente);
    } else if (opcion === "7") {
      volver = true;
    } else {
      console.log("Opcion no valida, intenta de nuevo.");
    }
  }
}

async function agregarProducto() {
  let id = Number(await rl.question("Ingrese el ID del producto: "));
  let nombre = await rl.question("Ingrese el nombre del producto: ");
  let precio = Number(await rl.question("Ingrese el precio del producto: "));
  let categoria = await rl.question("Ingrese la categoria (Bebida/Postre): ");

  let producto = { id, nombre, precio, categoria, disponible: true };
  productos.push(producto);
  console.log("Producto agregado correctamente.");
}

function listarProductos() {
  console.log("---- PRODUCTOS ----");
  for (let i = 0; i < productos.length; i++) {
    console.log(
      "ID: " + productos[i].id +
      " | Nombre: " + productos[i].nombre +
      " | Precio: $" + productos[i].precio +
      " | Categoria: " + productos[i].categoria +
      " | Disponible: " + (productos[i].disponible ? "Si" : "No")
    );
  }
}

async function buscarProducto() {
  let id = Number(await rl.question("Ingrese el ID del producto que desea buscar: "));
  let productoEncontrado = productos.find(producto => producto.id === id);

  if (productoEncontrado) {
    console.log("\nProducto encontrado:");
    console.log("ID: " + productoEncontrado.id);
    console.log("Nombre: " + productoEncontrado.nombre);
    console.log("Precio: $" + productoEncontrado.precio);
    console.log("Categoria: " + productoEncontrado.categoria);
  } else {
    console.log("No se encontro el producto.");
  }
}

function productosBaratos() {
  let baratos = productos.filter(producto => producto.precio < 50);
  console.log("\n---- PRODUCTOS BARATOS ----");
  for (let i = 0; i < baratos.length; i++) {
    console.log(baratos[i].nombre + " - $" + baratos[i].precio);
  }
}

function productosCaros() {
  let caros = productos.filter(producto => producto.precio >= 50);
  console.log("\n---- PRODUCTOS CAROS ----");
  for (let i = 0; i < caros.length; i++) {
    console.log(caros[i].nombre + " - $" + caros[i].precio);
  }
}

function mostrarBebidas() {
  let bebidas = productos.filter(producto => producto.categoria === "Bebida");
  console.log("\n---- BEBIDAS ----");
  for (let i = 0; i < bebidas.length; i++) {
    console.log(bebidas[i].nombre + " - $" + bebidas[i].precio);
  }
}

function mostrarPostres() {
  let postres = productos.filter(producto => producto.categoria === "Postre");
  console.log("\n---- POSTRES ----");
  for (let i = 0; i < postres.length; i++) {
    console.log(postres[i].nombre + " - $" + postres[i].precio);
  }
}

async function editarProducto() {
  let id = Number(await rl.question("Ingrese el ID del producto que desea editar: "));
  let producto = productos.find(producto => producto.id === id);

  if (producto) {
    producto.nombre = await rl.question("Ingrese el nuevo nombre: ");
    producto.precio = Number(await rl.question("Ingrese el nuevo precio: "));
    producto.categoria = await rl.question("Ingrese la nueva categoria (Bebida/Postre): ");

    const dispoTexto = await rl.question("Disponible? (si/no): ");
    producto.disponible = dispoTexto.toLowerCase() === "si";

    console.log("Producto actualizado.");
  } else {
    console.log("No se encontro el producto.");
  }
}

async function eliminarProducto() {
  let id = Number(await rl.question("Ingrese el ID del producto que desea eliminar: "));
  let producto = productos.find(producto => producto.id === id);

  if (producto) {
    productos = productos.filter(producto => producto.id !== id);
    console.log("Producto eliminado.");
  } else {
    console.log("No se encontro el producto.");
  }
}

async function menuCocina() {
  let opcion;

  do {
    console.log(
      "---- COCINA ----" +
      "1. Agregar producto\n" +
      "2. Listar productos\n" +
      "3. Buscar producto\n" +
      "4. Productos baratos\n" +
      "5. Productos caros\n" +
      "6. Mostrar bebidas\n" +
      "7. Mostrar postres\n" +
      "8. Editar producto\n" +
      "9. Eliminar producto\n" +
      "0. Volver al menu principal"
    );

    opcion = Number(await rl.question("Seleccione una opcion: "));

    switch (opcion) {
      case 1:
        await agregarProducto();
        break;
      case 2:
        listarProductos();
        break;
      case 3:
        await buscarProducto();
        break;
      case 4:
        productosBaratos();
        break;
      case 5:
        productosCaros();
        break;
      case 6:
        mostrarBebidas();
        break;
      case 7:
        mostrarPostres();
        break;
      case 8:
        await editarProducto();
        break;
      case 9:
        await eliminarProducto();
        break;
      case 0:
        console.log("Volviendo al menu principal...");
        break;
      default:
        console.log("Opcion no valida.");
    }
  } while (opcion !== 0);
}

async function iniciar() {
  let salir = false;

  while (!salir) {
    console.log("===== CAFETERIA UPQ =====");
    console.log("1. Entrar como Cliente");
    console.log("2. Entrar como Cocina");
    console.log("3. Entrar como Caja");
    console.log("4. Salir");

    const opcion = await rl.question("Elige una opcion: ");

    if (opcion === "1") {
      await menuCliente();
    } else if (opcion === "2") {
      await menuCocina();
    } else if (opcion === "3") {
      await menuCaja();
    } else if (opcion === "4") {
      salir = true;
      console.log("Hasta luego!");
    } else {
      console.log("Opcion no valida, intenta de nuevo.");
    }
  }

  rl.close();
}

iniciar();