import type { Property } from '../../entities';
import type { PropertyDataProvider } from './types';

export class PropertyLocalDataProviderImpl implements PropertyDataProvider {
  private readonly storageKey = 'broker_app_db';

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

  updateProperty = async (property: Property): Promise<Property> => {
    const properties = this.getPropertiesFromStorage();
    const index = properties.findIndex((p) => p.id === property.id);

    if (index === -1) {
      throw new Error(`Property with id ${property.id} not found`);
    }

    properties[index] = property;
    this.savePropertiesToStorage(properties);

    return property;
  };

  deletePropertyById = async (id: string): Promise<void> => {
    const properties = this.getPropertiesFromStorage();
    const filteredProperties = properties.filter((property) => property.id !== id);

    if (properties.length === filteredProperties.length) {
      throw new Error(`Property with id ${id} not found`);
    }

    this.savePropertiesToStorage(filteredProperties);
  };
}
