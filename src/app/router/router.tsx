import { createBrowserRouter, Outlet } from 'react-router';
import { MainPage, PropertyFormPage, SettingsPage } from '../../pages';
import { BottomNavbar, BOTTOM_NAVBAR_HEIGHT } from '../components/bottom-navbar';
import { propertyDataProvider } from '../../data';
import { Box } from '@mantine/core';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box
        pos='relative'
        h='100%'
        pb={BOTTOM_NAVBAR_HEIGHT}
      >
        <Outlet />
        <BottomNavbar />
      </Box>
    ),
    children: [
      {
        index: true,
        loader: async () => {
          return {
            properties: await propertyDataProvider.getProperties(),
          };
        },
        Component: MainPage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
      {
        path: 'properties/create',
        Component: PropertyFormPage,
      },
      {
        path: 'properties/:id/edit',
        Component: PropertyFormPage,
      },
    ],
  },
]);
