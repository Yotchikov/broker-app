import type { Prospect } from '../../entities';
import type { ProspectDataProvider } from './types';

export class ProspectLocalDataProviderImpl implements ProspectDataProvider {
  private readonly storageKey = 'broker_app_db';

  private getProspectsFromStorage(): Prospect[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];

      const data = JSON.parse(stored);

      return data.prospect || [];
    } catch (error) {
      console.error('Error reading prospects from localStorage:', error);

      return [];
    }
  }

  private saveProspectsToStorage(prospects: Prospect[]): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const data = stored ? JSON.parse(stored) : {};

      data.prospect = prospects;
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving prospects to localStorage:', error);
      throw new Error('Failed to save prospects to localStorage');
    }
  }

  getProspectById = async (id: string): Promise<Prospect> => {
    const prospects = this.getProspectsFromStorage();
    const prospect = prospects.find((prospect) => prospect.id === id);

    if (!prospect) {
      throw new Error(`Prospect with id ${id} not found`);
    }

    return prospect;
  };

  createProspect = async (prospect: Prospect): Promise<Prospect> => {
    const prospects = this.getProspectsFromStorage();

    // Check if prospect with this ID already exists
    const existingProspect = prospects.find((p) => p.id === prospect.id);
    if (existingProspect) {
      throw new Error(`Prospect with id ${prospect.id} already exists`);
    }

    prospects.push(prospect);
    this.saveProspectsToStorage(prospects);

    return prospect;
  };

  updateProspect = async (prospect: Prospect): Promise<Prospect> => {
    const prospects = this.getProspectsFromStorage();
    const index = prospects.findIndex((p) => p.id === prospect.id);

    if (index === -1) {
      throw new Error(`Prospect with id ${prospect.id} not found`);
    }

    prospects[index] = prospect;
    this.saveProspectsToStorage(prospects);

    return prospect;
  };

  deleteProspectById = async (id: string): Promise<void> => {
    const prospects = this.getProspectsFromStorage();
    const filteredProspects = prospects.filter((prospect) => prospect.id !== id);

    if (prospects.length === filteredProspects.length) {
      throw new Error(`Prospect with id ${id} not found`);
    }

    this.saveProspectsToStorage(filteredProspects);
  };
}
