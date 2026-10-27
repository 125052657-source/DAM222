/*1. zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Platform, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

/*2. zona de main */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // aqui carga 3 segundos para el Splash
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  //la pantalla de splash, esta te da la bienvenida 
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashIcon}>😸</Text>
        <Text style={styles.splashTitle}>BIENVENIDOS</Text>
        <Text style={styles.splashSub}>Práctica No.9: Componentes Nativos</Text>
        <ActivityIndicator size="large" color="#fff" style={{marginTop: 20}} />
        <Text style={styles.splashLoading}>Cargando presentación...</Text>
        <StatusBar style="light" />
      </View>
    );
  }

  //la pantalla principal
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>ImageBackgroung & SlapshScreen </Text>
        <Text style={styles.subtitulo}>José de Jesús </Text>
        <Text style={styles.subtitulo}>Genaro vera </Text>
        <Text style={styles.subtitulo}>Francisco Joel </Text>
      </View>
      
      <StatusBar style="light" />
    </ImageBackground>
  );
}

/3. zona de estilos y posicionamiento/
const styles = StyleSheet.create({
  // Estilos del Splash
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14532d', // Verde UPQ
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  splashIcon: {
    fontSize: 80,
  },
  splashTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  splashSub: {
    color: '#a7f3d0',
    fontSize: 18,
    marginTop: 5,
  },
  splashLoading: {
    color: '#d1fae5',
    fontSize: 12,
    marginTop: 20,
  },
  // Estilos de tu presentacion principal
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    color: '#a7f3d0',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  }
});
