import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Práctica de equipo</Text>
                <Text style={styles.subtitle}>Desliza hacia abajo para ver más</Text>
                
                {[...Array(15)].map((_, index) => (
                    <View key={index} style={styles.box}>
                        <Text style={styles.boxText}>Registro de prueba {index + 1}</Text>
                    </View>
                ))}
                <StatusBar style="dark" />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#00BFFF',
    },
    scrollContent: {
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    box: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 20,
        marginVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
    },
    boxText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
    },
});
