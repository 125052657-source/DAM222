import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Field from '../../components/Field';
import Button from '../../components/Button';
import InfoBox from '../../components/InfoBox';
import { colors, spacing } from '../../theme';

export default function RecuperarContrasenaScreen() {
  return (
    <Screen>
      <Header kicker="Comunidad · Acceso" title="Recupera tu acceso" back />

      <View style={styles.center}>
        <View style={styles.circle}>
          <Ionicons name="key-outline" size={40} color={colors.primary} />
        </View>
        <Text style={styles.title}>Volvamos a conectar</Text>
        <Text style={styles.paragraph}>
          Te enviaremos un enlace seguro para crear una nueva contraseña.
        </Text>
      </View>

      <Field label="Correo de la cuenta" value="ana.martinez@correo.mx" icon="mail-outline" />

      <Button label="Enviar enlace de recuperación" />

      <InfoBox
        title="¿Qué sucede después?"
        text="Abre el correo del Banco de Tiempo y Talento. El enlace estará disponible durante 30 minutos."
      />

      <InfoBox
        tone="warning"
        text="Por seguridad, recibirás la misma confirmación exista o no una cuenta con ese correo."
      />

      <Button label="Volver a iniciar sesión" variant="outline" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', marginVertical: spacing.lg },
  circle: {
    width: 92, height: 92, borderRadius: 46, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  paragraph: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm, lineHeight: 19 },
});