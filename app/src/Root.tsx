import React from 'react';

import { ThemeProvider } from 'styled-components';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from '@styles/themes';

import App from './App';

export function Root() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default Root;
