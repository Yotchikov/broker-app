import type { Prospect } from 'data';

export interface ProspectProvider {
  getProspectById: (id: string) => Promise<Prospect>;
}
