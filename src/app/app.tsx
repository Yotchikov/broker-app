import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router';
import { useState } from 'react';
import { router } from './router';
import { SplashScreen } from './components';

const theme = createTheme({
  fontFamily: 'Manrope, sans-serif',
  primaryColor: 'orange',
  primaryShade: 7,
  colors: {
    orange: [
      '#fff3e5',
      '#fce6d2',
      '#f5cca6',
      '#eeb076',
      '#e9984d',
      '#e68933',
      '#e58125',
      '#d57419',
      '#b56211',
      '#9e5305',
    ],
  },
});

export const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <MantineProvider theme={theme}>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
