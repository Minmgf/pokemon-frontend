import { PokemonCard } from '@/components/PokemonCard';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/hooks/useFavorites';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();
  const [favoritePokemon, setFavoritePokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const fetchFavorites = async () => {
    if (favorites.length === 0) {
      setFavoritePokemon([]);
      return;
    }
    setLoading(true);
    try {
      // Obtener favoritos en paralelo
      const requests = favorites.map(id => axios.get(`${API_URL}/pokemon/${id}`));
      const responses = await Promise.all(requests);
      const data = responses.map(r => r.data);
      setFavoritePokemon(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
         <Text style={[styles.title, { color: colors.text }]}>Tus Favoritos</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : favoritePokemon.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No tienes favoritos aun.</Text>
          <Text style={styles.emptySubtext}>Explora y encuentra Pokemon!</Text>
        </View>
      ) : (
        <FlatList
          data={favoritePokemon}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonCard 
              id={item.id}
              name={item.name}
              image={item.image}
              onPress={() => router.push(`/pokemon/${item.id}` as any)}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.dark.icon,
    marginTop: 8,
  },
});
