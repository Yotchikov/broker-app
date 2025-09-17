import { createBrowserRouter, Outlet } from 'react-router';
import { MainPage, PropertyFormPage, PropertyPage, SettingsPage } from '../../pages';
import { BottomNavbar, BOTTOM_NAVBAR_HEIGHT } from '../components/bottom-navbar';
import { ownerDataProvider, propertyDataProvider, prospectDataProvider } from '../../data';

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
        path: 'properties/:id',
        loader: async ({ params }) => {
          if (!params.id) {
            throw new Error('Property ID is required');
          }

          const property = await propertyDataProvider.getPropertyById(params.id);
          const owner = property.ownerId ? await ownerDataProvider.getOwnerById(property.ownerId) : null;

          // Load prospects for this property
          const prospects = [];
          for (const prospectId of property.prospectIds) {
            try {
              const prospect = await prospectDataProvider.getProspectById(prospectId);
              prospects.push(prospect);
            } catch {
              // Ignore missing prospects
            }
          }

          return {
            property,
            owner,
            prospects,
          };
        },
        Component: PropertyPage,
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
