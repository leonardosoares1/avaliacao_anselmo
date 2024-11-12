import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@enums': path.resolve(__dirname, './src/enums'),
      '@errors': path.resolve(__dirname, './src/errors'),
      '@formatters': path.resolve(__dirname, './src/formatters'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@parsers': path.resolve(__dirname, './src/parsers'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@serializers': path.resolve(__dirname, './src/serializers'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@tools': path.resolve(__dirname, './src/tools'),
      '@validators/index': path.resolve(__dirname, './src/validators'),
    },
  },
});
