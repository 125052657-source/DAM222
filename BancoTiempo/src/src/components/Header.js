import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

// Encabezado con texto pequeño arriba, título grande y subtítulo.
// back=true muestra la flecha "‹" antes del título.
export default function Header({ kicker, title, subtitle, back = false }) {
  return (
    <View style={styles.box}>
      {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
      <View style={styles.row}>
        {back ? <Ionicons name="chevron-back" size={26} color={colors.primary} /> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginBottom: spacing.md },
  kicker: { fontSize: 11, color: colors.textMuted, marginBottom: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs },
});