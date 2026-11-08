import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Proyecto Móvil · Segundo Parcial · Banco de Tiempo y Talento
// SIN navegación: para ver otra pantalla, cambia cuál se importa y se muestra aquí.
// import BienvenidaScreen from './src/src/screens/acceso/BienvenidaScreen';
// import IniciarSesionScreen from './src/src/screens/acceso/IniciarSesionScreen';
// import RegistroScreen from './src/src/screens/acceso/RegistroScreen';
import RecuperarContrasenaScreen from './src/src/screens/acceso/RecuperarContrasenaScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {/*<BienvenidaScreen />*/}
      {/*<IniciarSesionScreen />*/}
      {/*<RegistroScreen />*/}
      <RecuperarContrasenaScreen />
    </SafeAreaProvider>
  );
}
