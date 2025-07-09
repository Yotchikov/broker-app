import type { Owner } from '../../entities';
import type { OwnerProvider } from './types';

class OwnerMockProvider implements OwnerProvider {
  private _owners: Owner[] = [
    {
      id: '1',
      name: 'Джон Доу',
    },
  ];

  getOwnerById = (id: string): Owner => {
    const owner = this._owners.find((owner) => owner.id === id);

    if (!owner) {
      throw new Error(`Owner with id ${id} not found`);
    }

    return owner;
  };
}

export const ownerMockProvider = new OwnerMockProvider();
