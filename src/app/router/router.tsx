import { createBrowserRouter, Outlet, Navigate } from 'react-router';
import { MainPage, PropertyFormPage, ProspectFormPage, SettingsPage, ShowingsPage } from '../../pages';
import { BottomNavbar } from '../components';
import { propertyDataProvider, showingDataProvider, prospectDataProvider } from '../../data';
import { Box } from '@mantine/core';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box
        pos='relative'
        h='100%'
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
      {
        path: 'prospects/create',
        loader: async () => {
          return {
            properties: await propertyDataProvider.getProperties(),
          };
        },
        Component: ProspectFormPage,
      },
      {
        path: 'showings',
        loader: async () => {
          const [showings, properties] = await Promise.all([
            showingDataProvider.getShowings(),
            propertyDataProvider.getProperties(),
          ]);

          const prospectIds = properties.flatMap((p) => p.prospectIds);
          const uniqueProspectIds = [...new Set(prospectIds)];
          const prospects = await Promise.all(
            uniqueProspectIds.map((id) => prospectDataProvider.getProspectById(id).catch(() => null)),
          );

          return {
            showings,
            properties,
            prospects: prospects.filter(Boolean),
          };
        },
        Component: ShowingsPage,
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
