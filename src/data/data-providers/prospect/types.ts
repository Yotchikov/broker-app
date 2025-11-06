import type { Prospect } from 'data';

export interface ProspectDataProvider {
  getProspectById: (id: string) => Promise<Prospect>;
  createProspect: (prospect: Prospect) => Promise<Prospect>;
  updateProspect: (prospect: Partial<Prospect> & { id: string }) => Promise<Prospect>;
  deleteProspectById: (id: string) => Promise<void>;
}
