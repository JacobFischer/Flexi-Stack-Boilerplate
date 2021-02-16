// This is the main entry point into the app
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import { theme } from './theme';

export const Body: React.FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <Routes render={({ Component }) => <Component />} />
  </ThemeProvider>
);
