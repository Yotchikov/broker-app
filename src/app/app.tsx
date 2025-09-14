import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router';
import { router } from './router';

const theme = createTheme({
  fontFamily: 'Outfit, sans-serif',
});

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
