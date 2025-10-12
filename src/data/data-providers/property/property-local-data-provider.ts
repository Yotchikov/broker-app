import type { Property } from '../../entities';
import type { OwnerDataProvider } from '../owner/types';
import type { ProspectDataProvider } from '../prospect/types';
import type { PropertyDataProvider } from './types';

export class PropertyLocalDataProviderImpl implements PropertyDataProvider {
  private readonly storageKey = 'broker_app_db';

  constructor(
    private readonly _ownerDataProvider: OwnerDataProvider,
    private readonly _prospectDataProvider: ProspectDataProvider,
  ) {
    this._ownerDataProvider = _ownerDataProvider;
    this._prospectDataProvider = _prospectDataProvider;
  }

  private getPropertiesFromStorage(): Property[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];

      const data = JSON.parse(stored);

      return data.property || [];
    } catch (error) {
      console.error('Error reading properties from localStorage:', error);

      return [];
    }
  }

  private savePropertiesToStorage(properties: Property[]): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const data = stored ? JSON.parse(stored) : {};

      data.property = properties;
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving properties to localStorage:', error);
      throw new Error('Failed to save properties to localStorage');
    }
  }

  getProperties = async (): Promise<Property[]> => {
    return this.getPropertiesFromStorage();
  };

  getPropertyById = async (id: string): Promise<Property> => {
    const properties = this.getPropertiesFromStorage();
    const property = properties.find((property) => property.id === id);

    if (!property) {
      throw new Error(`Property with id ${id} not found`);
    }

    return property;
  };

  createProperty = async (property: Property): Promise<Property> => {
    const properties = this.getPropertiesFromStorage();

    // Check if property with this ID already exists
    const existingProperty = properties.find((p) => p.id === property.id);
    if (existingProperty) {
      throw new Error(`Property with id ${property.id} already exists`);
    }

    properties.push(property);
    this.savePropertiesToStorage(properties);

    return property;
  };

  updateProperty = async (property: Partial<Property> & { id: string }): Promise<Property> => {
    const properties = this.getPropertiesFromStorage();
    const index = properties.findIndex((p) => p.id === property.id);

    if (index === -1) {
      throw new Error(`Property with id ${property.id} not found`);
    }

    properties[index] = { ...properties[index], ...property };
    this.savePropertiesToStorage(properties);

    return { ...properties[index], ...property };
  };

  deletePropertyById = async (id: string): Promise<void> => {
    const properties = this.getPropertiesFromStorage();
    const property = properties.find((property) => property.id === id);

    if (!property) {
      throw new Error(`Property with id ${id} not found`);
    }

    this._ownerDataProvider.deleteOwnerById(property.ownerId!);

    for (const prospectId of property.prospectIds) {
      this._prospectDataProvider.deleteProspectById(prospectId);
    }

    const filteredProperties = properties.filter((property) => property.id !== id);

    this.savePropertiesToStorage(filteredProperties);
  };

  deletePropertyProspectById = async (id: string): Promise<void> => {
    const properties = this.getPropertiesFromStorage();
    const index = properties.findIndex((p) => p.prospectIds.includes(id));

    if (index !== -1) {
      properties[index].prospectIds = properties[index].prospectIds.filter((prospectId) => prospectId !== id);
    }

    this.savePropertiesToStorage(properties);

    this._prospectDataProvider.deleteProspectById(id);
  };
}
