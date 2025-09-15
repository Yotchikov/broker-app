import type { Prospect } from 'data';

export interface ProspectDataProvider {
  getProspectById: (id: string) => Promise<Prospect>;
  createProspect: (prospect: Prospect) => Promise<Prospect>;
}
