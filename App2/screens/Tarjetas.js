/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from '../components/Perfil';


/* 2. Zona Main */
export default function Tarjetas() {
    return (
        <View style={styles.container}>


            <Perfil style={styles.tarjeta1} nombre="Leo" materia="Movil" carrera="TIID" cuatrimestre="4to" />


            <Perfil style={styles.tarjeta2} nombre="Carlos" materia="Movil" carrera="TIID" cuatrimestre="4to" />


            <Perfil style={styles.tarjeta3} nombre="Aaron" materia="Movil" carrera="TIID" cuatrimestre="4to" />



            <StatusBar style="auto" />
        </View>
    );
}

/* 3. Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    tarjeta1: {
        backgroundColor: '#0e4959',
    },
    tarjeta2: {
        backgroundColor: '#180d59',
    },
    tarjeta3: {
        backgroundColor: '#6e0e0e',
    },
});
