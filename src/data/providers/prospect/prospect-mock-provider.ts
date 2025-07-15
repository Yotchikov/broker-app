import type { Prospect } from '../../entities';
import type { ProspectProvider } from './types';

class ProspectMockProviderImpl implements ProspectProvider {
  private _prospects: Prospect[] = [
    {
      id: '1',
      name: 'Александр Еремеев',
    },
    {
      id: '2',
      name: 'Пара с котом',
    },
  ];

  getProspectById = async (id: string) => {
    const prospect = this._prospects.find((prospect) => prospect.id === id);

    if (!prospect) {
      throw new Error(`Prospect with id ${id} not found`);
    }

    return prospect;
  };
}

export const prospectMockProvider = new ProspectMockProviderImpl();
