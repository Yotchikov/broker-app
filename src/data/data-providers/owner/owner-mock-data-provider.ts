import type { Owner } from '../../entities';
import type { OwnerDataProvider } from './types';

import avatar1 from '../../../../public/memoji/Avatar-1.png';
import avatar2 from '../../../../public/memoji/Avatar-2.png';
import avatar3 from '../../../../public/memoji/Avatar-3.png';

export class OwnerMockDataProviderImpl implements OwnerDataProvider {
  private _owners: Owner[] = [
    {
      id: '1',
      name: 'Джон Доу',
      avatar: avatar1,
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
      avatar: avatar2,
      contacts: {
        phone: '+79876543210',
        email: 'irina.ivanova@example.com',
        telegram: undefined,
        whatsapp: '+79876543210',
      },
    },
    {
      id: '3',
      name: 'Александр Петров',
      avatar: avatar3,
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

  updateOwner = async (owner: Owner): Promise<Owner> => {
    const index = this._owners.findIndex((o) => o.id === owner.id);

    if (index === -1) {
      throw new Error(`Owner with id ${owner.id} not found`);
    }

    this._owners[index] = owner;

    return owner;
  };

  deleteOwnerById = async (id: string): Promise<void> => {
    this._owners = this._owners.filter((owner) => owner.id !== id);
  };
}
