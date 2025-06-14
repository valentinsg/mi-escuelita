// #region Importaciones
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// #endregion

// https://vitejs.dev/config/
export default defineConfig({
  // #region Plugins y optimización
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // #endregion
});
