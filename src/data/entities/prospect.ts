import type { BaseEntity } from './base-entity';

export type ProspectStatus =
  | 'inquired'
  | 'scheduled_a_showing'
  | 'feedback_from_the_showing'
  | 'request_to_the_owner'
  | 'bargaining'
  | 'contract_discussion'
  | 'document_preparation'
  | 'scheduled_signing'
  | 'deal'
  | 'feedback_from_the_deal';

export type Prospect = BaseEntity & {
  contacts: {
    phone?: string;
    email?: string;
    telegram?: string;
    whatsapp?: string;
  };
  avatar?: string;
  status: ProspectStatus;
};
