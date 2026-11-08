import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Field from '../../components/Field';
import Button from '../../components/Button';
import InfoBox from '../../components/InfoBox';
import { colors, radius, spacing } from '../../theme';

export default function IniciarSesionScreen() {
  return (
    <Screen>
      <Header
        kicker="Comunidad · Acceso"
        title="Qué gusto verte"
        subtitle="Ingresa para continuar con tus intercambios."
      />

      {/* Tarjeta de bienvenida */}
      <View style={styles.hero}>
        <Ionicons name="hand-left-outline" size={26} color={colors.primary} />
        <Text style={styles.heroTitle}>Tu próximo intercambio empieza aquí.</Text>
        <Text style={styles.heroSub}>Banco de Tiempo y Talento</Text>
      </View>

      <Field label="Correo electrónico" value="ana.martinez@correo.mx" icon="mail-outline" />
      <Field label="Contraseña" value="••••••••••" icon="eye-off-outline" secure />

      <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>

      <Button label="Iniciar sesión" />

      <InfoBox text="Si tu cuenta es Usuario general o Administrador, verás el inicio correspondiente al entrar." />

      <Text style={styles.question}>¿Aún no tienes cuenta?</Text>
      <Button label="Crear mi cuenta" variant="outline" />

      <Text style={styles.footer}>Al continuar aceptas los términos de la comunidad y su aviso de privacidad.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primarySoft, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
  },
  heroTitle: { fontSize: 20, fontWeight: '700', color: colors.primary, marginTop: spacing.sm },
  heroSub: { fontSize: 12, color: colors.textMuted, marginTop: spacing.xs },
  link: { fontSize: 13, fontWeight: '700', color: colors.primary, marginTop: spacing.xs },
  question: { textAlign: 'center', fontSize: 13, color: colors.textMuted, marginTop: spacing.md },
  footer: { textAlign: 'center', fontSize: 11, color: colors.textMuted, marginTop: spacing.md },
});