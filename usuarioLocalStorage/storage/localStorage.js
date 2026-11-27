const storageDisponible = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const guardarDatos = async (clave, valor) => {
  if (!storageDisponible()) {
    throw new Error('LocalStorage no está disponible. Ejecuta la app en el navegador.');
  }
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error('Error al guardar datos:', error);
    throw new Error('No se pudieron guardar los datos');
  }
};

export const obtenerDatos = async (clave, valorPorDefecto = null) => {
  if (!storageDisponible()) {
    throw new Error('LocalStorage no está disponible. Ejecuta la app en el navegador.');
  }
  try {
    const texto = window.localStorage.getItem(clave);
    return texto !== null ? JSON.parse(texto) : valorPorDefecto;
  } catch (error) {
    console.error('Error al leer datos:', error);
    return valorPorDefecto;
  }
};

export const eliminarDatos = async (clave) => {
  if (!storageDisponible()) {
    throw new Error('LocalStorage no está disponible. Ejecuta la app en el navegador.');
  }
  try {
    window.localStorage.removeItem(clave);
    return true;
  } catch (error) {
    console.error('Error al eliminar datos:', error);
    throw new Error('No se pudieron eliminar los datos');
  }
};

