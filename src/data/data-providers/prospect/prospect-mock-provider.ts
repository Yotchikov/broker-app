import type { Prospect } from '../../entities';
import type { ProspectDataProvider } from './types';
import avatar1 from '../../../../public/memoji/Avatar-1.png';

export class ProspectMockDataProviderImpl implements ProspectDataProvider {
  private _prospects: Prospect[] = [
    {
      id: '1',
      name: 'Александр Еремеев',
      photo: avatar1,
      contacts: {
        phone: '+79876543210',
        email: 'alexander.eremeev@example.com',
        telegram: 'alexander_eremeev',
        whatsapp: '+79876543210',
      },
      status: 'inquired',
    },
    {
      id: '2',
      name: 'Пара с котом',
      contacts: {
        phone: '+79876543210',
        email: 'paras_kotom@example.com',
        telegram: 'paras_kotom',
        whatsapp: '+79876543210',
      },
      status: 'scheduled_a_showing',
    },
    {
      id: '3',
      name: 'Марк',
      contacts: {
        phone: '+1234567890',
        email: 'mark@example.com',
        telegram: 'mark',
        whatsapp: '+1234567890',
      },
      status: 'bargaining',
    },
    {
      id: '4',
      name: 'Илон Маск',
      contacts: {
        phone: '+1234567890',
        email: 'elon.musk@example.com',
        telegram: 'elon_musk',
        whatsapp: '+1234567890',
      },
      status: 'contract_discussion',
    },
    {
      id: '5',
      name: 'Стив Джобс',
      contacts: {
        phone: '+1234567890',
        email: 'steve.jobs@example.com',
        telegram: 'steve_jobs',
        whatsapp: '+1234567890',
      },
      status: 'document_preparation',
    },
    {
      id: '6',
      name: 'Билл Гейтс',
      contacts: {
        phone: '+1234567890',
        email: 'bill.gates@example.com',
        telegram: 'bill_gates',
        whatsapp: '+1234567890',
      },
      status: 'scheduled_signing',
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
