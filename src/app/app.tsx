import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router';
import { router } from './router';

const theme = createTheme({
  fontFamily: 'Manrope, sans-serif',
  colors: {
    blue: [
      '#e8f2ff',
      '#d0e0fe',
      '#9fbefb',
      '#6b99f9',
      '#417bf7',
      '#2967f7',
      '#1c5df8',
      '#104edd',
      '#0343c1',
      '#003baf',
    ],
  },
});

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
