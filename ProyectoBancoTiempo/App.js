import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DataProvider } from './src/src/context/DataContext';
import NavigationProvider from './src/src/navigation/NavigationProvider';
import { screens } from './src/src/navigation/screens';
// import screens from './src/navigation/screens';

// Proyecto BancoTiempo
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <DataProvider>
        <NavigationProvider screens={screens} initial="Bienvenida" />
      </DataProvider>
    </SafeAreaProvider>
  );
}
