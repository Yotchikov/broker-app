import type { Owner } from 'data';

export interface OwnerDataProvider {
  getOwnerById: (id: string) => Promise<Owner | null>;
}
