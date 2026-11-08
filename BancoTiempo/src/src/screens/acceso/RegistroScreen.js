import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Avatar from '../../components/Avatar';
import Field from '../../components/Field';
import Button from '../../components/Button';
import InfoBox from '../../components/InfoBox';
import { colors, spacing } from '../../theme';

export default function RegistroScreen() {
  return (
    <Screen>
      <Header
        kicker="Comunidad · Registro"
        title="Únete a la comunidad"
        subtitle="Crea tu cuenta de usuario general."
        back
      />

      <View style={styles.photoRow}>
        <Avatar initials="AM" size={44} />
        <Text style={styles.photoLink}>Agregar foto de perfil</Text>
      </View>

      <Field label="Nombre completo" value="Ana Martínez" />
      <Field label="Correo electrónico" value="ana.martinez@correo.mx" icon="mail-outline" />
      <Field label="Teléfono" value="55 2468 1837" icon="call-outline" />
      <Field label="Contraseña" value="••••••••••" icon="eye-off-outline" secure hint="Mínimo 8 caracteres, con letras y números." />
      <Field label="Ubicación" value="Centro, Querétaro" icon="location-outline" />

      <InfoBox
        tone="success"
        text="Recibirás 5 créditos de bienvenida al activar tu cuenta. Podrás gastarlos desde el primer día."
      />

      <View style={styles.switchRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.switchTitle}>Acepto los términos y privacidad</Text>
          <Text style={styles.switchSub}>Consulta las reglas del Banco de Tiempo.</Text>
        </View>
        <Switch value trackColor={{ true: colors.success }} />
      </View>

      <Button label="Crear cuenta" />

      <Text style={styles.footer}>Ya tengo cuenta · Iniciar sesión</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  photoLink: { marginLeft: spacing.sm + 4, fontSize: 13, fontWeight: '700', color: colors.primary },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
  switchTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  switchSub: { fontSize: 11, color: colors.textMuted },
  footer: { textAlign: 'center', fontSize: 12, color: colors.primary, marginTop: spacing.md },
});