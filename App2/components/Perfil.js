/*1. zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Perfil} from '../components/Perfil';


/2. zona de main/ 
export default function Tarjetas() {
  return (

    <View style={styles.container}>

      <Perfil style={styles.tarjeta1} nombre="Alan" carrera="Sistemas" materia="Desarrollo de aplicaciones Moviles" cuatri="4"/>

      <Perfil style={styles.tarjeta2} nombre="Jose" carrera="Sistemas" materia="Desarrollo de aplicaciones Moviles" cuatri="4"/>

      <Perfil style={styles.tarjeta3} nombre="Edu" carrera="Sistemas" materia="Desarrollo de aplicaciones Moviles" cuatri="4"/>
      

      <StatusBar style="auto" />
    </View>
  );
}

/3. zona de estilos y posicionamiento/
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tarjeta1:{backgroundColor:'pink'},
  tarjeta2:{backgroundColor:'red'},
  tarjeta3:{backgroundColor:'yellow'},
});