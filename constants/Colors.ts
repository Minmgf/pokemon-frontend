/**
 * Paleta de colores.
 * - Fondo: Negro/gris oscuro.
 * - Primario: Colores de Pokemon.
 * - Texto: Alto contraste blanco y grises suaves.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    surface: "#F0F2F5",
    surfaceHighlight: "#E1E3E5",
    primary: "#E3350D",
    secondary: "#3B4CCA",
    success: "#4CAF50",
    warning: "#FFC107",
    danger: "#F44336",
    glass: "rgba(255, 255, 255, 0.8)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#121212",
    surface: "#1E1E1E",
    surfaceHighlight: "#2C2C2C",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#E3350D",
    secondary: "#3B4CCA",
    success: "#4CAF50",
    warning: "#FFC107",
    danger: "#F44336",
    glass: "rgba(30, 30, 30, 0.8)",
  },
};
