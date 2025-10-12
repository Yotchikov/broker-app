import { PropertyLocalDataProviderImpl } from './property-local-data-provider';
import { prospectDataProvider } from '../prospect';
import { ownerDataProvider } from '../owner';

// export const propertyDataProvider = new PropertyMockDataProviderImpl();
export const propertyDataProvider = new PropertyLocalDataProviderImpl(ownerDataProvider, prospectDataProvider);
