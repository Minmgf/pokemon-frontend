import { ScreenWrapper } from '@/components/ScreenWrapper';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { useFavorites } from '@/hooks/useFavorites';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// URL de API duplicada por ahora
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const { colors } = useTheme();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/pokemon/${id}`);
        setPokemon(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading || !pokemon) {
    return (
      <ScreenWrapper style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenWrapper>
    );
  }

  const isFav = isFavorite(pokemon.id);

  const handleToggleFavorite = async () => {
    await toggleFavorite(pokemon.id);
    const newStatus = !isFav;
    showToast(
      newStatus ? 'Añadido a favoritos' : 'Eliminado de favoritos',
      newStatus ? 'success' : 'info'
    );
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        {/* Encabezado */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <IconSymbol name="arrow.left" size={28} color={colors.text} />
          </Pressable>
          <Pressable onPress={handleToggleFavorite}>
            <IconSymbol 
              name={isFav ? "heart.fill" : "heart"} 
              size={28} 
              color={isFav ? colors.primary : colors.text} 
            />
          </Pressable>
        </View>

        {/* Sección Hero */}
        <View style={styles.hero}>
          <Text style={[styles.name, { color: colors.text }]}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
            <Text style={[styles.typeText, { color: colors.text }]}>Tipo</Text>
          <View style={styles.typesRow}>
            {pokemon.types.map((type: string) => (
              <View key={type} style={[styles.typeBadge, { backgroundColor: colors.surfaceHighlight }]}>
                <Text style={[styles.typeText, { color: colors.text }]}>{type}</Text>
              </View>
            ))}
          </View>

          {/* Habilidades */}
          <View style={styles.abilitiesContainer}>
             <Text style={[styles.sectionTitle, { color: colors.text, fontSize: 16, marginBottom: 8 }]}>Habilidades</Text>
             <View style={styles.abilitiesRow}>
              {pokemon.abilities?.map((ability: string) => (
                <View key={ability} style={[styles.abilityBadge, { borderColor: colors.primary }]}>
                  <Text style={[styles.abilityText, { color: colors.text }]}>{ability}</Text>
                </View>
              ))}
             </View>
          </View>

          <MotiView
            from={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
          >
            <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
          </MotiView>
        </View>

        {/* Sección de Estadísticas */}
        <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Base Stats</Text>
          {Object.entries(pokemon.stats).map(([stat, value]: [string, any], index) => (
            <View key={stat} style={styles.statRow}>
              <Text style={[styles.statName, { color: colors.icon }]}>{stat.toUpperCase()}</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
              <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceHighlight }]}>
                <MotiView
                  from={{ width: '0%' }}
                  animate={{ width: `${Math.min(value as number, 100)}%` }}
                  transition={{ type: 'timing', duration: 1000, delay: index * 100 }}
                  style={[styles.progressBarFill, { 
                    backgroundColor: (value as number) > 50 ? colors.success : colors.warning 
                  }]}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  hero: {
    alignItems: 'center',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  abilitiesContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  abilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  abilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  abilityText: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  image: {
    width: 300,
    height: 300,
  },
  statsContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    marginTop: -40,
    minHeight: 400,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statName: {
    width: 60,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValue: {
    width: 40,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});
