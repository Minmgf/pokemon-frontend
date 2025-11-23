import { useTheme } from '@/context/ThemeContext';
import { MotiView } from 'moti';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  onPress: () => void;
}

export function PokemonCard({ id, name, image, onPress }: PokemonCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500 }}
        style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.surfaceHighlight }]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
          <Text style={[styles.id, { color: colors.icon }]}>#{id.toString().padStart(3, '0')}</Text>
        </View>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 8,
    maxWidth: '46%',
  },
  card: {
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, // Opacidad reducida para un aspecto más suave
    shadowRadius: 4.65,
    elevation: 4,
    borderWidth: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  id: {
    fontSize: 12,
  },
});
