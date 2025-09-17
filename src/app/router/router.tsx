import { createBrowserRouter, Outlet } from 'react-router';
import { MainPage, PropertyFormPage, SettingsPage } from '../../pages';
import { BottomNavbar, BOTTOM_NAVBAR_HEIGHT } from '../components/bottom-navbar';
import { propertyDataProvider } from '../../data';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div style={{ paddingBottom: BOTTOM_NAVBAR_HEIGHT }}>
        <Outlet />
        <BottomNavbar />
      </div>
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
