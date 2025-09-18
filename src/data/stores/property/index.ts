import { PropertyStore } from './property-store';
import { propertyDataProvider } from '../../data-providers';

export const propertyStore = new PropertyStore(propertyDataProvider);
