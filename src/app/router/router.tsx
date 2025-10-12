import { createBrowserRouter, Outlet, Navigate } from 'react-router';
import { MainPage, PropertyFormPage, SettingsPage } from '../../pages';
import { TopNavbar, TOP_NAVBAR_HEIGHT, BottomNavbar, BOTTOM_NAVBAR_HEIGHT } from '../components';
import { propertyDataProvider } from '../../data';
import { Box } from '@mantine/core';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box
        pos='relative'
        h='100%'
        pt={TOP_NAVBAR_HEIGHT}
        pb={BOTTOM_NAVBAR_HEIGHT}
      >
        <TopNavbar />
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
      {
        path: '*',
        element: (
          <Navigate
            to='/'
            replace
          />
        ),
      },
    ],
  },
]);
