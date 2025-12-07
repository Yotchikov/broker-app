import type { Showing } from '../../entities';
import type { ShowingDataProvider } from './types';

export class ShowingLocalDataProviderImpl implements ShowingDataProvider {
  private readonly storageKey = 'broker_app_db';

  private getShowingsFromStorage(): Showing[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];

      const data = JSON.parse(stored);

      return data.showing || [];
    } catch (error) {
      console.error('Error reading showings from localStorage:', error);

      return [];
    }
  }

  private saveShowingsToStorage(showings: Showing[]): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const data = stored ? JSON.parse(stored) : {};

      data.showing = showings;
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving showings to localStorage:', error);
      throw new Error('Failed to save showings to localStorage');
    }
  }

  getShowings = async (): Promise<Showing[]> => {
    return this.getShowingsFromStorage();
  };

  getShowingById = async (id: string): Promise<Showing> => {
    const showings = this.getShowingsFromStorage();
    const showing = showings.find((showing) => showing.id === id);

    if (!showing) {
      throw new Error(`Showing with id ${id} not found`);
    }

    return showing;
  };

  createShowing = async (showing: Showing): Promise<Showing> => {
    const showings = this.getShowingsFromStorage();

    // Check if showing with this ID already exists
    const existingShowing = showings.find((s) => s.id === showing.id);
    if (existingShowing) {
      throw new Error(`Showing with id ${showing.id} already exists`);
    }

    showings.push(showing);
    this.saveShowingsToStorage(showings);

    return showing;
  };

  updateShowing = async (showing: Partial<Showing> & { id: string }): Promise<Showing> => {
    const showings = this.getShowingsFromStorage();
    const index = showings.findIndex((s) => s.id === showing.id);

    if (index === -1) {
      throw new Error(`Showing with id ${showing.id} not found`);
    }

    showings[index] = { ...showings[index], ...showing };
    this.saveShowingsToStorage(showings);

    return { ...showings[index], ...showing };
  };

  deleteShowingById = async (id: string): Promise<void> => {
    const showings = this.getShowingsFromStorage();
    const filteredShowings = showings.filter((showing) => showing.id !== id);

    if (showings.length === filteredShowings.length) {
      throw new Error(`Showing with id ${id} not found`);
    }

    this.saveShowingsToStorage(filteredShowings);
  };
}
