import type { Prospect } from 'data';

export interface ProspectDataProvider {
  getProspectById: (id: string) => Promise<Prospect>;
  createProspect: (prospect: Prospect) => Promise<Prospect>;
  updateProspect: (prospect: Prospect) => Promise<Prospect>;
  deleteProspectById: (id: string) => Promise<void>;
}
