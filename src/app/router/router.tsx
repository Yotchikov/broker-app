import { createBrowserRouter } from 'react-router';
import { MainPage, PropertyPage } from '../../pages';
import { ownerMockProvider, propertyMockProvider } from '../../data';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      return {
        properties: await propertyMockProvider.getProperties(),
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

      const property = await propertyMockProvider.getPropertyById(params.id);
      const owner = await ownerMockProvider.getOwnerById(property.ownerId);

      return {
        property,
        owner,
      };
    },
    Component: PropertyPage,
  },
]);
