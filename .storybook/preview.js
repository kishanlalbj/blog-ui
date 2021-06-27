import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../src/theme';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => (
    <Suspense fallback='Loading'>
      <ThemeProvider theme={theme}>
        <Story></Story>
      </ThemeProvider>
    </Suspense>
  )
];
