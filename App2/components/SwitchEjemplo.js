import { View, Text, Switch, StyleSheet } from "react-native";

export default function SwitchEjemplo({ obscuro, setObscuro }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.titulo, { color: obscuro ? '#FFFFFF' : '#000000' }]}>
                Modo oscuro
            </Text>
            <Switch
                value={obscuro}
                onValueChange={setObscuro}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});