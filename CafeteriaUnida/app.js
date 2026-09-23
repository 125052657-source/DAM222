/* const productosIniciales = [
    { id: 1, nombre: "Café americano", precio: 35 },
    { id: 2, nombre: "Capuchino", precio: 55 },
    { id: 3, nombre: "Pan dulce", precio: 25 },
    { id: 4, nombre: "Sándwich", precio: 75 }
];

let productos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let carrito = [];
let productoEditando = null;

function guardarDatos() {
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function generarId() {
    return Date.now();
}

function mostrarModulo(id) {
    document.querySelectorAll(".modulo").forEach(modulo => {
        modulo.classList.remove("activo");
    });

    document.getElementById(id).classList.add("activo");

    mostrarProductosCaja();
    mostrarProductosCliente();
    listarProductos();
    mostrarPedidosCaja();
    mostrarPedidosCliente();
}

function mostrarProductosCaja() {
    const contenedor = document.getElementById("productosCaja");

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                ${producto.nombre} - $${producto.precio}
            </div>
        `;
    });
}

function mostrarPedidosCaja() {
    const contenedor = document.getElementById("pedidosCaja");

    contenedor.innerHTML = "";

    let totalVentas = 0;

    if (pedidos.length === 0) {
        contenedor.innerHTML = "<p>No hay pedidos registrados.</p>";
    }

    pedidos.forEach(pedido => {
        if (pedido.pagado) {
            totalVentas += pedido.total;
        }

        contenedor.innerHTML += `
            <div class="pedido">
                <strong>Pedido #${pedido.id}</strong><br>
                Cliente: ${pedido.cliente}<br>
                Total: $${pedido.total.toFixed(2)}<br>
                Estado: ${pedido.estado}<br>
                Pago: ${pedido.pagado ? "Pagado" : "Pendiente"}

                ${
                    !pedido.pagado
                    ? `<button onclick="cobrarPedido(${pedido.id})">
                        Cobrar
                       </button>`
                    : ""
                }
            </div>
        `;
    });

    document.getElementById("totalCaja").textContent =
        `$${totalVentas.toFixed(2)}`;
}

function guardarProducto() {
    const nombre = document.getElementById("nombreProducto").value.trim();
    const precio = Number(document.getElementById("precioProducto").value);

    if (nombre === "" || precio <= 0) {
        alert("Ingresa un nombre y un precio válido.");
        return;
    }

    if (productoEditando === null) {
        productos.push({
            id: generarId(),
            nombre: nombre,
            precio: precio
        });
    } else {
        const producto = productos.find(
            producto => producto.id === productoEditando
        );

        producto.nombre = nombre;
        producto.precio = precio;

        productoEditando = null;
    }

    guardarDatos();
    limpiarFormulario();
    listarProductos();
    mostrarProductosCaja();
    mostrarProductosCliente();
}

function listarProductos() {
    const contenedor = document.getElementById("listaProductos");

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <strong>${producto.nombre}</strong>
                - $${producto.precio}

                <br>

                <button class="editar"
                    onclick="editarProducto(${producto.id})">
                    Editar
                </button>

                <button class="eliminar"
                    onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>
            </div>
        `;
    });
}

function editarProducto(id) {
    const producto = productos.find(
        producto => producto.id === id
    );

    document.getElementById("nombreProducto").value =
        producto.nombre;

    document.getElementById("precioProducto").value =
        producto.precio;

    productoEditando = id;
}

function eliminarProducto(id) {
    productos = productos.filter(
        producto => producto.id !== id
    );

    guardarDatos();
    listarProductos();
    mostrarProductosCaja();
    mostrarProductosCliente();
}

function cancelarEdicion() {
    limpiarFormulario();
    productoEditando = null;
}

function limpiarFormulario() {
    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
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
    mostrarPedidosCaja();
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

function cobrarPedido(id) {
    const pedido = pedidos.find(
        pedido => pedido.id === id
    );

    if (pedido) {
        pedido.pagado = true;
        pedido.estado = "Entregado";

        guardarDatos();
        mostrarPedidosCaja();
        mostrarPedidosCliente();

        alert("Pedido cobrado correctamente.");
    }
}

document.getElementById("nombreCliente").addEventListener("input", mostrarPedidosCliente);

mostrarProductosCaja();
mostrarProductosCliente();
listarProductos();
mostrarPedidosCaja();
mostrarCarrito(); */