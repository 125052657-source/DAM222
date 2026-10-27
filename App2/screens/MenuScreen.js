/*1. zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';
import Tarjetas from './Tarjetas';
import SafeScreen from './SafeScreen';
import Pressable from './Pressable';
import TextInput from './TextInput';
import FlatList from './FlatList';
import ImageBackground from './ImageBackground';
import Modal from './Modal';
import ActivityIndicator from './ActivityIndicator';

/*2. zona de main*/
export default function MenuScreen() {

  const [screen, setScreen] = useState('menu');

  switch (screen) {
    case 'tarjetas':
      return <Tarjetas />;
    case 'safescreen':
      return <SafeScreen />;
    case 'pressable':
      return <Pressable />;
    case 'textinput':
      return <TextInput />;
    case 'flatlist':
      return <FlatList />;
    case 'imagebackground':
      return <ImageBackground />;
    case 'modal':
      return <Modal />;
    case 'activityindicator':
      return <ActivityIndicator />;
    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <Text>Menú de Prácticas</Text>

          <Button title='Tarjetas' onPress={() => setScreen('tarjetas')} />
          <Button title='SafeAreaView' onPress={() => setScreen('safescreen')} />
          <Button title='Pressable & Switch' onPress={() => setScreen('pressable')} />
          <Button title='TextInput & Alert' onPress={() => setScreen('textinput')} />
          <Button title='FlatList & SectionList' onPress={() => setScreen('flatlist')} />
          <Button title='ImageBackground & SplashScreen' onPress={() => setScreen('imagebackground')} />
          <Button title='Modal & Bottom Sheet' onPress={() => setScreen('modal')} />
          <Button title='ActivityIndicator, KeyboardAvoidingView' onPress={() => setScreen('activityindicator')} />

          <StatusBar style="auto" />
        </View>
      );
  }
}

/*3. zona de estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});