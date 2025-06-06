import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Importamos el plugin de React para Vite
import tailwindcss from '@tailwindcss/vite'; // Importamos el plugin de Tailwind CSS para Vite

/**
 * Configuración de Vite
 *
 * Este archivo configura el comportamiento del servidor de desarrollo de Vite y
 * define cómo se compila la aplicación.
 *
 * @see https://vite.dev/config/
 */
export default defineConfig({
  // Plugins utilizados por nuestra aplicación
  plugins: [
    react(), // Plugin para soporte de React
    tailwindcss(), // Plugin para soporte de Tailwind CSS
  ],

  // Configuración del servidor de desarrollo
  server: {
    watch: {
      // Excluimos el archivo db.json para que no cause recargas de página
      // cuando se modifica. Esto es importante porque json-server actualiza este archivo
      // frecuentemente y no queremos que se recargue la aplicación cada vez.
      ignored: ['**/db.json'],
    },
  },
});
