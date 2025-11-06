import type { Property } from 'data';

export interface PropertyDataProvider {
  getProperties: () => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property>;
  createProperty: (property: Property) => Promise<Property>;
  updateProperty: (property: Partial<Property> & { id: string }) => Promise<Property>;
  deletePropertyById: (id: string) => Promise<void>;
  deletePropertyProspectById: (id: string) => Promise<void>;
}
