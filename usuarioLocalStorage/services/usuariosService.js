import { guardarDatos, obtenerDatos } from '../storage/localStorage';

const CLAVE_USUARIOS = 'usuarios';

// ---------- VALIDACIONES ----------
export const validarUsuario = ({ nombre, edad }) => {
  const nombreLimpio = String(nombre ?? '').trim();
  const edadTexto = String(edad ?? '').trim();

  if (!nombreLimpio) return 'El nombre es obligatorio';
  if (nombreLimpio.length < 3) return 'El nombre debe tener al menos 3 caracteres';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombreLimpio)) {
    return 'El nombre solo puede contener letras y espacios';
  }

  if (!edadTexto) return 'La edad es obligatoria';
  if (!/^\d+$/.test(edadTexto)) return 'La edad debe ser un número entero';

  const edadNumero = Number(edadTexto);
  if (edadNumero < 1 || edadNumero > 120) return 'La edad debe estar entre 1 y 120';

  return null; 
};

// ---------- OPERACIONES ----------

export const obtenerUsuarios = async () => {
  return await obtenerDatos(CLAVE_USUARIOS, []);
};

export const obtenerUsuarioPorId = async (id) => {
  const usuarios = await obtenerUsuarios();
  return usuarios.find((u) => u.id === String(id)) ?? null;
};

export const agregarUsuario = async ({ nombre, edad }) => {
  const error = validarUsuario({ nombre, edad });
  if (error) return { ok: false, mensaje: error };

  const usuarios = await obtenerUsuarios();
  const nuevo = {
    id: Date.now().toString(),
    nombre: nombre.trim(),
    edad: Number(edad),
  };
  await guardarDatos(CLAVE_USUARIOS, [...usuarios, nuevo]);
  return { ok: true, mensaje: 'Usuario agregado correctamente' };
};

export const actualizarUsuario = async (id, { nombre, edad }) => {
  const error = validarUsuario({ nombre, edad });
  if (error) return { ok: false, mensaje: error };

  const usuarios = await obtenerUsuarios();
  if (!usuarios.some((u) => u.id === String(id))) {
    return { ok: false, mensaje: 'El usuario no existe' };
  }
  const actualizados = usuarios.map((u) =>
    u.id === String(id) ? { ...u, nombre: nombre.trim(), edad: Number(edad) } : u
  );
  await guardarDatos(CLAVE_USUARIOS, actualizados);
  return { ok: true, mensaje: 'Usuario actualizado correctamente' };
};

export const eliminarUsuario = async (id) => {
  const usuarios = await obtenerUsuarios();
  const filtrados = usuarios.filter((u) => u.id !== String(id));

  if (filtrados.length === usuarios.length) {
    return { ok: false, mensaje: 'El usuario no existe' };
  }
  await guardarDatos(CLAVE_USUARIOS, filtrados);
  return { ok: true, mensaje: 'Usuario eliminado correctamente' };
};

