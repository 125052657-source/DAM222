const readline = require('node:readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
 
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
 