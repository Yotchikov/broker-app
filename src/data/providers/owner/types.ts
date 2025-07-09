import type { Owner } from 'data';

export interface OwnerProvider {
  getOwnerById: (id: string) => Owner;
}
