/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';



/* 2. Zona Main */
export default function ActivityIndicator() {
return (
    <View style={styles.container}>


        <Text> Aqui va la practica de Yoshua</Text>



    <StatusBar style="auto" />
    </View>
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
