import type { Owner } from '../../entities';
import type { OwnerDataProvider } from './types';

export class OwnerMockDataProviderImpl implements OwnerDataProvider {
  private _owners: Owner[] = [
    {
      id: '1',
      name: 'Джон Доу',
      emoji: '🇺🇸',
      contacts: {
        phone: '+1234567890',
        email: 'john.doe@example.com',
        telegram: 'john_doe',
        whatsapp: '+1234567890',
      },
    },
    {
      id: '2',
      name: 'Ирина Иванова',
      emoji: '🇷🇺',
      contacts: {
        phone: '+79876543210',
        email: 'irina.ivanova@example.com',
        telegram: 'irina_ivanova',
        whatsapp: '+79876543210',
      },
    },
    {
      id: '3',
      name: 'Александр Петров',
      emoji: '🇷🇺',
      contacts: {
        phone: '+79876543210',
        email: 'alexander.petrov@example.com',
        telegram: 'alexander_petrov',
        whatsapp: '+79876543210',
      },
    },
  ];

  getOwnerById = async (id: string) => {
    const owner = this._owners.find((owner) => owner.id === id);

    if (!owner) {
      return null;
    }

    return owner;
  };

  createOwner = async (owner: Owner): Promise<Owner> => {
    this._owners.push(owner);

    return owner;
  };
}
