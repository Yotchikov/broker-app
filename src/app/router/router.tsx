import { createBrowserRouter } from 'react-router';
import { MainPage, PropertyFormPage, PropertyPage } from '../../pages';
import { ownerDataProvider, propertyDataProvider } from '../../data';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      return {
        properties: await propertyDataProvider.getProperties(),
      };
    },
    Component: MainPage,
  },
  {
    path: '/history',
    element: <div>History</div>,
  },
  {
    path: '/settings',
    element: <div>Settings</div>,
  },
  {
    path: '/properties/:id',
    loader: async ({ params }) => {
      if (!params.id) {
        throw new Error('Property ID is required');
      }

      const property = await propertyDataProvider.getPropertyById(params.id);
      const owner = property.ownerId ? await ownerDataProvider.getOwnerById(property.ownerId) : null;

      return {
        property,
        owner,
      };
    },
    Component: PropertyPage,
  },
  {
    path: '/properties/create',
    Component: PropertyFormPage,
  },
  {
    path: '/properties/:id/edit',
    Component: PropertyFormPage,
  },
]);
