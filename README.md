# Mini Pokédex - React Native

Aplicación móvil desarrollada en React Native con Expo que consume una API propia (backend) para mostrar un listado de Pokémon y sus detalles.

## Comenzando

### Prerrequisitos

- Node.js
- npm o yarn
- Expo CLI

### Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd pokemon-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade la URL de tu backend:

   ```env
   EXPO_PUBLIC_BACKEND_URL=http://tu-backend-url.com
   ```

4. Ejecuta la aplicación:

   ```bash
   npx expo start
   ```

## Funcionalidades

- **Listado de Pokémon**: Scroll infinito con paginación desde el backend.
- **Detalle de Pokémon**: Muestra imagen, tipos, habilidades y estadísticas base.
- **Búsqueda**: Encuentra Pokémon por nombre.
- **Favoritos**: Guarda tus Pokémon favoritos (persistencia local).
- **Modo Oscuro**: Soporte para tema oscuro y claro.

## Tecnologías

- **Frontend**: React Native, Expo, TypeScript.
- **Navegación**: Expo Router.
- **Estilos**: StyleSheet, Moti (animaciones).
- **Estado**: Context API.
- **HTTP Client**: Axios.

## Manejo de Favoritos

El sistema de favoritos se ha implementado utilizando una arquitectura robusta y reactiva:

1. **Context API (`FavoritesContext`)**:
    - Se utiliza un contexto global para manejar el estado de los favoritos en toda la aplicación.
    - Esto permite que cualquier componente (Listado, Detalle, Pantalla de Favoritos) reaccione instantáneamente a los cambios.

2. **Persistencia (`AsyncStorage`)**:
    - Los IDs de los Pokémon favoritos se guardan localmente en el dispositivo.
    - Al iniciar la app, se recuperan estos datos para mantener la selección del usuario entre sesiones.

3. **Feedback de Usuario (`ToastContext`)**:
    - Se implementó un sistema de notificaciones tipo "Toast" personalizado.
    - Al agregar o eliminar un favorito, el usuario recibe una confirmación visual animada en la parte inferior de la pantalla.

## Tiempo de Desarrollo Frontend

- **Inicio**: 23/11/2024
- **Fin**: 23/11/2024
- **Tiempo estimado**: 4 horas

## Diseño

Basado en la exploración de diseño de Figma: [Pokemon Mobile App Exploration](https://www.figma.com/design/hVxMhMK4CqtVqfo4MYNbGz/Pokemon-Mobile-App-Exploration--Community-?node-id=1-204&p=f)
