import type { Owner } from '../../entities';
import type { OwnerDataProvider } from './types';

export class OwnerLocalDataProviderImpl implements OwnerDataProvider {
  private readonly storageKey = 'broker_app_db';

  private getOwnersFromStorage(): Owner[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];

      const data = JSON.parse(stored);

      return data.owner || [];
    } catch (error) {
      console.error('Error reading owners from localStorage:', error);

      return [];
    }
  }

  private saveOwnersToStorage(owners: Owner[]): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const data = stored ? JSON.parse(stored) : {};

      data.owner = owners;
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving owners to localStorage:', error);
      throw new Error('Failed to save owners to localStorage');
    }
  }

  getOwnerById = async (id: string): Promise<Owner> => {
    const owners = this.getOwnersFromStorage();
    const owner = owners.find((owner) => owner.id === id);

    if (!owner) {
      throw new Error(`Owner with id ${id} not found`);
    }

    return owner;
  };

  createOwner = async (owner: Owner): Promise<Owner> => {
    const owners = this.getOwnersFromStorage();

    // Check if owner with this ID already exists
    const existingOwner = owners.find((o) => o.id === owner.id);
    if (existingOwner) {
      throw new Error(`Owner with id ${owner.id} already exists`);
    }

    owners.push(owner);
    this.saveOwnersToStorage(owners);

    return owner;
  };

  updateOwner = async (owner: Partial<Owner> & { id: string }): Promise<Owner> => {
    const owners = this.getOwnersFromStorage();
    const index = owners.findIndex((o) => o.id === owner.id);

    if (index === -1) {
      throw new Error(`Owner with id ${owner.id} not found`);
    }

    owners[index] = { ...owners[index], ...owner };
    this.saveOwnersToStorage(owners);

    return { ...owners[index], ...owner };
  };

  deleteOwnerById = async (id: string): Promise<void> => {
    const owners = this.getOwnersFromStorage();
    const filteredOwners = owners.filter((owner) => owner.id !== id);

    if (owners.length === filteredOwners.length) {
      throw new Error(`Owner with id ${id} not found`);
    }

    this.saveOwnersToStorage(filteredOwners);
  };
}
