import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Saludo} from './components/Saludo'
import { Saludo2} from './components/Saludo2'
import { Perfil} from './components/Perfil'

export default function App() {
  return (
    <View style={styles.container}>

      <Text>Hola Mundo</Text>
      <Image source={require("./assets/wave.png")}></Image>
      <Text>-------------------------------------</Text>
      <Saludo></Saludo>
      <Saludo/>
      <Text>-------------------------------------</Text>
      <Saludo2></Saludo2>
      <Saludo2/>
      <StatusBar style="auto" />
      <Text>-------------------------------------</Text>
      <Perfil></Perfil>
      <Perfil/>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
