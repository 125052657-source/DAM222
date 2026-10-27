import {View, Text, StyleSheet,Button } from 'react-native';
import {useState} from 'react';


export const Perfil=({nombre, carrera,materia,cuatri,style})=>{

  const [mostrar, setMostrar]=useState(false);

return(
  
    <View style={[estilos.tarjeta, style]}>
       <Text style={estilos.nombre}>{nombre}</Text>

       {mostrar &&
        <>
       <Text style={estilos.carrera}>{carrera}</Text>
       <Text style={estilos.otroTexto}>{materia}</Text>
       <Text style={estilos.otroTexto}>{cuatri}</Text>
       </>
      }
      <Button title="ver perfil" onPress={()=>setMostrar(!mostrar)}/>

</View>
 
)}

const estilos=StyleSheet.create({
  nombre:{
  fontSize:24,
  fontWeight:'600',
  textTransform:'uppercase',
},
  carrera:{
    fontSize:18,
    color:'purple',
    fontFamily:'Roboto',
  },
  otroTexto:{
    fontSize:12,
    fontFamily:'Courier',
    fontStyle:'italic',
  },
    tarjeta:{
    borderWidth:3,
    borderRadius:10,
    padding:15,
    margin:10,
  },
});