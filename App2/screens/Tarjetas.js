/*1. zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Perfil} from '../components/Perfil';


/*2. zona de main*/ 
export default function Tarjetas() {
  return (

    <View style={styles.container}>

      <Perfil style={styles.tarjeta1} nombre="Genaro" carrera="Sistemas" materia="Desarrollo de aplicaciones Moviles" cuatri="4"/>

      <Perfil style={styles.tarjeta2} nombre="Jesus" carrera="Sistemas" materia="Desarrollo de aplicaciones Moviles" cuatri="4"/>

      <Perfil style={styles.tarjeta3} nombre="Fran" carrera="Sistemas" materia="Desarrollo de aplicaciones Moviles" cuatri="4"/>
      

      <StatusBar style="auto" />
    </View>
  );
}

/*3. zona de estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#4735e7',
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tarjeta1:{backgroundColor:'lightblue'},
  tarjeta2:{backgroundColor:'lightgreen'},
  tarjeta3:{backgroundColor:'lightpink'},
});