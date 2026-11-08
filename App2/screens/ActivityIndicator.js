import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text, View, Button, ActivityIndicator as RNActivityIndicator
} from 'react-native';
import { useState } from 'react';
import Inicio from "./Inicio";

export default function ActivityIndicator({ setScreen }) {
    const [cargando, setCargando] = useState(false);
    const [pantalla, setPantalla] = useState('principal');

    function cambiarPantalla(destino) {
        setCargando(true);

        setTimeout(() => {
            setPantalla(destino);
            setCargando(false);
        }, 1500);
    }

    if (cargando) {
        return (
            <View style={styles.cargando}>
                <RNActivityIndicator size="large" />
                <Text style={styles.texto}>Cargando...</Text>
            </View>
        );
    }

    if (pantalla === 'inicio') {
        return (
            <Inicio onRegresar={() => cambiarPantalla('principal')} />
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Pantalla Principal</Text>
            <Button title='Ir a Inicio' onPress={() => cambiarPantalla('inicio')} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 15,
    },
    cargando: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20
    },
    texto: {
        marginTop: 10,
        fontSize: 16
    },
});


