const productosIniciales = [
    { id: 1, nombre: "Café americano", precio: 35 },
    { id: 2, nombre: "Capuchino", precio: 55 },
    { id: 3, nombre: "Pan dulce", precio: 25 },
    { id: 4, nombre: "Sándwich", precio: 75 }
];

let productos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let carrito = [];

function guardarDatos() {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function generarId() {
    return Date.now();
}

function mostrarProductosCliente() {
    const contenedor = document.getElementById("productosCliente");

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                ${producto.nombre} - $${producto.precio}

                <button onclick="agregarAlCarrito(${producto.id})">
                    Agregar
                </button>
            </div>
        `;
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(
        producto => producto.id === id
    );

    carrito.push(producto);

    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("carritoCliente");
    const total = document.getElementById("totalCliente");

    contenedor.innerHTML = "";

    let suma = 0;

    carrito.forEach((producto, indice) => {
        suma += producto.precio;

        contenedor.innerHTML += `
            <div class="producto">
                ${producto.nombre} - $${producto.precio}

                <button class="eliminar"
                    onclick="quitarDelCarrito(${indice})">
                    Quitar
                </button>
            </div>
        `;
    });

    total.textContent = suma.toFixed(2);
}

function quitarDelCarrito(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
}

function crearPedido() {
    const nombre = document.getElementById("nombreCliente").value.trim();

    if (nombre === "") {
        alert("Escribe el nombre del cliente.");
        return;
    }

    if (carrito.length === 0) {
        alert("Agrega productos al pedido.");
        return;
    }

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio,
        0
    );

    const pedido = {
        id: generarId(),
        cliente: nombre,
        productos: carrito,
        total: total,
        estado: "Pendiente",
        pagado: false
    };

    pedidos.push(pedido);

    guardarDatos();

    carrito = [];

    mostrarCarrito();
    mostrarPedidosCliente();

    alert("Pedido enviado correctamente.");
}

function mostrarPedidosCliente() {
    const nombre = document.getElementById("nombreCliente").value.trim();
    const contenedor = document.getElementById("pedidosCliente");

    contenedor.innerHTML = "";

    if (nombre === "") {
        contenedor.innerHTML = "<p>Escribe tu nombre para ver tus pedidos.</p>";
        return;
    }

    const misPedidos = pedidos.filter(
        pedido => pedido.cliente.toLowerCase() === nombre.toLowerCase()
    );

    misPedidos.forEach(pedido => {
        contenedor.innerHTML += `
            <div class="pedido">
                <strong>Pedido #${pedido.id}</strong><br>
                Total: $${pedido.total.toFixed(2)}<br>
                Estado: ${pedido.estado}<br>
                Pago: ${pedido.pagado ? "Pagado" : "Pendiente"}
            </div>
        `;
    });

    if (misPedidos.length === 0) {
        contenedor.innerHTML = "<p>No tienes pedidos registrados.</p>";
    }
}

document.getElementById("nombreCliente").addEventListener("input", mostrarPedidosCliente);

mostrarProductosCliente();
mostrarCarrito();
mostrarPedidosCliente();