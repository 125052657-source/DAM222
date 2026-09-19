const productos = [
  { id: 1, nombre: "Pan dulce", precio: 10},
  { id: 2, nombre: "Cafe del día", precio: 40},
  { id: 3, nombre: "Taco", precio: 25 },
  { id: 4, nombre: "Refresco", precio: 20 },
  { id: 5, nombre: "Quesadilla", precio: 35 },
];

const pedidos = [];

function agregarPedido(producto) {
  pedidos.push(producto);
}

function mostrarMenu() {
  const menu = document.getElementById("menu");

  productos.forEach(p => {
    menu.innerHTML += `
      <li>
        <span>${p.nombre} - $${p.precio}</span>
        <button onclick="crearPedido(${p.id})">Agregar</button>
      </li>
    `;
  });
}

function crearPedido(id) {
  const producto = productos.find(p => p.id === id);
  agregarPedido(producto);
  listarPedidos();
}

function listarPedidos() {
  const lista = document.getElementById("lista-ticket");
  const total = document.getElementById("total");
  let suma = 0;

  lista.innerHTML = "";

  if (pedidos.length === 0) {
    lista.innerHTML = "<li>Aún no has agregado nada</li>";
  }

  pedidos.forEach(p => {
    lista.innerHTML += `<li><span>${p.nombre}</span><span>$${p.precio}</span></li>`;
    suma = suma + p.precio;
  });

  total.textContent = `$${suma}`;
}

mostrarMenu();
listarPedidos();