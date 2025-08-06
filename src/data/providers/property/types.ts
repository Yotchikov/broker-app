import type { Property } from 'data';

export interface PropertyProvider {
  getProperties: () => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property>;
  createProperty: (property: Property) => Promise<Property>;
}
