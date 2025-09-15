import type { Owner } from 'data';

export interface OwnerDataProvider {
  getOwnerById: (id: string) => Promise<Owner | null>;
  createOwner: (owner: Owner) => Promise<Owner>;
}
