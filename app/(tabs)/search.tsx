import { PokemonCard } from '@/components/PokemonCard';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { useTheme } from '@/context/ThemeContext';
import { usePokemon } from '@/hooks/usePokemon';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function SearchScreen() {
  const { pokemon, loadMore, loading } = usePokemon();
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Mira los Pokemon</Text>
        <Text style={[styles.title, { color: colors.text }]}>Disponibles en la region</Text>
      </View>

      <FlatList
        data={pokemon}
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
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
  },
  listContent: {
    padding: 12,
    paddingBottom: 100,
  },
});
