import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { FavoritesProvider } from '@/context/FavoritesContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};


// Evita que la pantalla de carga se oculte automáticamente antes de que se complete la carga de activos.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ToastProvider>
          <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="pokemon/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </NavigationThemeProvider>
        </ToastProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
