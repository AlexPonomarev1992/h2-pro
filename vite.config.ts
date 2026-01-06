import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Оптимизация размера чанков
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React и React-DOM в отдельный vendor чанк
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          
          // Three.js в отдельный чанк (он тяжелый)
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }
          
          // Mapbox в отдельный чанк (загружается lazy)
          if (id.includes('node_modules/mapbox-gl')) {
            return 'map-vendor';
          }
          
          // GSAP анимации
          if (id.includes('node_modules/gsap')) {
            return 'animation-vendor';
          }
          
          // Все Radix UI компоненты в один чанк
          if (id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }
          
          // React Query
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'query-vendor';
          }
          
          // Остальные большие библиотеки
          if (id.includes('node_modules')) {
            // Определяем размер пакета
            const packageName = id.split('node_modules/')[1]?.split('/')[0];
            
            // Группируем маленькие пакеты вместе
            if (packageName) {
              return 'vendor';
            }
          }
        },
      },
    },
    
    // Увеличиваем лимит предупреждения для больших чанков
    chunkSizeWarningLimit: 800,
    
    // Используем Terser для лучшей минификации
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в продакшене
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Удаляем конкретные console функции
      },
      mangle: {
        safari10: true, // Поддержка Safari 10
      },
    },
    
    // Оптимизация CSS
    cssCodeSplit: true,
    
    // Source maps только для продакшена (для отладки)
    sourcemap: false,
    
    // Оптимизация для современных браузеров
    target: 'es2015',
  },
  
  // Оптимизация dev сервера
  server: {
    hmr: true,
  },
  
  // Оптимизация production билда
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    exclude: [
      'mapbox-gl', // Не предварительно оптимизируем - он большой
    ],
  },
});
