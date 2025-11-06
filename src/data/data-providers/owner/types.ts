import type { Owner } from 'data';

export interface OwnerDataProvider {
  getOwnerById: (id: string) => Promise<Owner>;
  createOwner: (owner: Owner) => Promise<Owner>;
  updateOwner: (owner: Partial<Owner> & { id: string }) => Promise<Owner>;
  deleteOwnerById: (id: string) => Promise<void>;
}
