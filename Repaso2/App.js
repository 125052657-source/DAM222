import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  ImageBackground, ActivityIndicator, Alert, Image, StyleSheet,
} from 'react-native';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  // SplashScreen: 2 segundos
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const agregarLibro = () => {
    // 1. Validar campos
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return;
    }
    // 2. Simular espera de 4 segundos con ActivityIndicator
    setGuardando(true);
    setTimeout(() => {
      // 3. Agregar a la lista
      setLibros([...libros, {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      }]);
      // 4. Limpiar inputs
      setTitulo('');
      setAutor('');
      setGenero('');
      setGuardando(false);
      // 5. Notificar
      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (showSplash) {
    return (
      <View style={styles.splash}>
        <Image source={require('./assets/Corazon.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.splashText}>repa2</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('./assets/Fondo.jpeg')} style={styles.fondo}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Catálogo de Libros</Text>

        <TextInput style={styles.input} placeholder="Título del libro"
          value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Autor"
          value={autor} onChangeText={setAutor} />
        <TextInput style={styles.input} placeholder="Género"
          value={genero} onChangeText={setGenero} />

        <TouchableOpacity
          style={[styles.boton, guardando && styles.botonDeshabilitado]}
          onPress={agregarLibro}
          disabled={guardando}
        >
          <Text style={styles.botonTexto}>
            {guardando ? 'Guardando...' : 'Agregar Libro'}
          </Text>
        </TouchableOpacity>

        {guardando && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loaderText}>Guardando libro...</Text>
          </View>
        )}

        <Text style={styles.total}>Total de libros: {libros.length}</Text>

        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardTexto}>Autor: {item.autor}</Text>
              <Text style={styles.cardTexto}>Género: {item.genero}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 150, height: 150 },
  splashText: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
  fondo: { flex: 1 },
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 12 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 12 },
  input: { backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 8, padding: 10, marginBottom: 8 },
  boton: { backgroundColor: '#1565C0', padding: 12, borderRadius: 8, alignItems: 'center' },
  botonDeshabilitado: { backgroundColor: '#888' },
  botonTexto: { color: '#fff', fontWeight: 'bold' },
  loader: { alignItems: 'center', marginVertical: 10 },
  loaderText: { color: '#fff', fontWeight: 'bold', marginTop: 4 },
  total: { color: '#fff', fontWeight: 'bold', marginVertical: 10 },
  card: { backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 8, padding: 10, marginBottom: 8 },
  cardTitulo: { fontWeight: 'bold', fontSize: 15 },
  cardTexto: { fontSize: 12 },
});