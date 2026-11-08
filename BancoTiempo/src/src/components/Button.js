import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

// variant: 'primary' (azul relleno) | 'outline' (borde azul)
// No tiene onPress: solo es interfaz, sin funcionamiento.
export default function Button({ label, variant = 'primary', icon }) {
  const outline = variant === 'outline';
  const textColor = outline ? colors.primary : '#FFFFFF';
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.btn, outline ? styles.outline : styles.filled]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      {icon ? <Ionicons name={icon} size={18} color={textColor} style={{ marginLeft: 8 }} /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 50, borderRadius: radius.md, marginTop: spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  filled: { backgroundColor: colors.primary },
  outline: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.primary },
  label: { fontSize: 15, fontWeight: '600' },
});