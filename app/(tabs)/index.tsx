import { ScreenWrapper } from '@/components/ScreenWrapper';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Pressable onPress={toggleTheme} style={styles.themeButton}>
            <IconSymbol 
              name={theme === 'dark' ? 'sun.max.fill' as any : 'moon.fill' as any} 
              size={28} 
              color={colors.text} 
            />
          </Pressable>
          <Image 
            source={{ uri: 'https://unavatar.io/github/37t?fallback=https://source.boringavatars.com/marble/120/1337_user?colors=264653r,2a9d8f,e9c46a,f4a261,e76f51' }} 
            style={[styles.avatar, { borderColor: colors.surfaceHighlight }]} 
          />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={[styles.greeting, { color: colors.text }]}>Hola! Maestro Pokemon 👋</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>Listos para atrapar tu siguiente pokemon?</Text>
        </View>

        {/* Tarjeta Principal */}
        <Pressable 
          style={[styles.mainCard, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)/search' as any)}
        >
          <View style={styles.mainCardContent}>
            <View>
              <Text style={styles.mainCardTitle}>Pokédex</Text>
              <Text style={styles.mainCardSubtitle}>Explora todos los Pokemon</Text>
            </View>
            <View style={styles.iconContainer}>
              <IconSymbol name="book.fill" size={32} color="#FFF" />
            </View>
          </View>
          <Image 
            source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }} 
            style={styles.pokeballBg}
            resizeMode="contain"
          />
        </Pressable>

        {/* Sección de Noticias */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Noticias Pokémon</Text>
        </View>

        <View style={styles.newsContainer}>
          <View style={[styles.newsCard, { backgroundColor: colors.surface, borderColor: colors.surfaceHighlight }]}>
            <View style={styles.newsContent}>
              <Text style={[styles.newsTitle, { color: colors.text }]}>¡Evento de Comunidad!</Text>
              <Text style={[styles.newsDate, { color: colors.icon }]}>23 Nov 2025</Text>
              <Text style={[styles.newsSnippet, { color: colors.icon }]}>
                Prepárate para capturar a Bulbasaur shiny este fin de semana. ¡No te lo pierdas!
              </Text>
            </View>
            <Image 
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' }} 
              style={styles.newsImage}
            />
          </View>

          <View style={[styles.newsCard, { backgroundColor: colors.surface, borderColor: colors.surfaceHighlight }]}>
            <View style={styles.newsContent}>
              <Text style={[styles.newsTitle, { color: colors.text }]}>Nueva Región Descubierta</Text>
              <Text style={[styles.newsDate, { color: colors.icon }]}>20 Nov 2025</Text>
              <Text style={[styles.newsSnippet, { color: colors.icon }]}>
                Los investigadores han encontrado rastros de una nueva región llena de Pokémon misteriosos.
              </Text>
            </View>
            <Image 
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' }} 
              style={styles.newsImage}
            />
          </View>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  themeButton: {
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
  },
  mainCard: {
    height: 300,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  mainCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  mainCardTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  mainCardSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginTop: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 24,
  },
  pokeballBg: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 300,
    height: 300,
    opacity: 0.2,
    transform: [{ rotate: '-20deg' }],
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  newsContainer: {
    gap: 16,
  },
  newsCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    gap: 16,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    marginBottom: 8,
  },
  newsSnippet: {
    fontSize: 14,
    lineHeight: 20,
  },
  newsImage: {
    width: 80,
    height: 80,
  },
});
