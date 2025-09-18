import type { Property } from 'data';

export interface PropertyDataProvider {
  getProperties: () => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property>;
  createProperty: (property: Property) => Promise<Property>;
  updateProperty: (property: Property) => Promise<Property>;
  deletePropertyById: (id: string) => Promise<void>;
}
