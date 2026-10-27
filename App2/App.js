/* 1. Zona de importaciones */
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image } from 'react-native';
import MenuScreen from './screens/MenuScreen';

/* 2. Zona Main */
export default function App() {
  return (
    <SafeAreaProvider>
      <MenuScreen />
    </SafeAreaProvider>
  );
}

/* 3. Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
