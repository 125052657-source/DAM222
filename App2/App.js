import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Saludo} from './components/Saludo'
import { Saludo2} from './components/Saludo2'
import { Perfil} from './components/Perfil'

export default function App() {
  return (
    <View style={styles.container}>

      
      <Perfil nombre="Genaro" carrera="ITIID" materia="Movil" cuatri="4to"/>

      <Perfil nombre="Jesus" carrera="ITIID" materia="Movil" cuatri="4to"/>

      <Perfil nombre="Fran" carrera="ITIID" materia="Movil" cuatri="4to"/>
      

      
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
