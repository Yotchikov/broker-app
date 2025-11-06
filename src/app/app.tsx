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
  colors: {
    orange: [
      '#fff5e2',
      '#ffe9cd',
      '#fed29c',
      '#fcb968',
      '#faa43b',
      '#fa961f',
      '#fa9214',
      '#df7c01',
      '#c76d00',
      '#ad5d00',
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
