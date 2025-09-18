import type { Property } from '../../entities';
import type { PropertyDataProvider } from './types';

export class PropertyMockDataProviderImpl implements PropertyDataProvider {
  private _properties: Property[] = [
    {
      id: '1',
      name: 'Волоколамское 24',
      price: {
        amount: 1500000000,
        currency: 'RUB',
      },
      ownerId: '1',
      prospectIds: ['1', '2', '3', '4', '5', '6'],
      dealType: 'sale',
      floor: {
        number: 25,
        total: 28,
      },
      area: 4400,
    },
    {
      id: '3',
      name: 'ЖК Пресня 13',
      price: {
        amount: 1500000000,
        currency: 'RUB',
      },
      ownerId: '1',
      prospectIds: ['1', '2', '3', '4', '5', '6'],
      dealType: 'sale',
      floor: {
        number: 25,
        total: 28,
      },
      area: 4400,
    },
    {
      id: '2',
      name: 'Куусинена 4Ак5',
      price: {
        amount: 9000000,
        currency: 'RUB',
      },
      ownerId: '2',
      prospectIds: [],
      dealType: 'rent',
    },
  ];

  getProperties = async (): Promise<Property[]> => {
    return this._properties;
  };

  getPropertyById = async (id: string): Promise<Property> => {
    const property = this._properties.find((property) => property.id === id);

    if (!property) {
      throw new Error(`Property with id ${id} not found`);
    }

    return property;
  };

  createProperty = async (property: Property): Promise<Property> => {
    this._properties.push(property);

    return property;
  };

  deletePropertyById = async (id: string): Promise<void> => {
    this._properties = this._properties.filter((property) => property.id !== id);
  };
}
