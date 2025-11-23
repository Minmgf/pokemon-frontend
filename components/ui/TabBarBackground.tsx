import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

// Este es un fondo simple para la barra de pestañas.
export default function TabBarBackground() {
  return <View style={styles.background} />;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.dark.glass,
  },
});
