/* 1. Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useState } from 'react';
import SwitchEjemplo from '../components/SwitchEjemplo';

/* 2. Zona Main */
export default function PressableScreen() {
    const [imagenGrande, setImagenGrande] = useState(false);
    const [obscuro, setObscuro] = useState(false);

    return (
        <View style={[styles.container, { backgroundColor: obscuro ? '#000000' : '#ffffff' }]}>

            <Pressable onPress={() => setImagenGrande(!imagenGrande)}>
                <Text style={[styles.texto, { color: obscuro ? '#ffffff' : '#000000' }]}>
                    Presioname
                </Text>
            </Pressable>

            <Pressable onPress={() => setImagenGrande(!imagenGrande)}>
                <Image
                    source={require('../assets/Chilango.jpeg')}
                    style={imagenGrande ? styles.imagenGrande : styles.image}
                />
            </Pressable>

            <SwitchEjemplo obscuro={obscuro} setObscuro={setObscuro} />

            <StatusBar style={obscuro ? 'light' : 'dark'} />
        </View>
    );
}

/* 3. Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 20,
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    imagenGrande: {
        width: 180,
        height: 180,
    },
})