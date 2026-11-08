import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

// Campo de texto con etiqueta pequeña, valor de ejemplo e ícono a la derecha.
export default function Field({ label, value, icon, secure = false, hint }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} defaultValue={value} secureTextEntry={secure} />
        {icon ? <Ionicons name={icon} size={18} color={colors.textMuted} /> : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: 10,
    marginBottom: spacing.sm,
  },
  label: { fontSize: 11, color: colors.textMuted },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 15, color: colors.text, paddingVertical: 4 },
  hint: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
});