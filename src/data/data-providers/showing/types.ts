import type { Showing } from 'data';

export interface ShowingDataProvider {
  getShowings: () => Promise<Showing[]>;
  getShowingById: (id: string) => Promise<Showing>;
  createShowing: (showing: Showing) => Promise<Showing>;
  updateShowing: (showing: Partial<Showing> & { id: string }) => Promise<Showing>;
  deleteShowingById: (id: string) => Promise<void>;
}
