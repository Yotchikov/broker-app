import type { BaseEntity } from './base-entity';

export type Owner = BaseEntity & {
  avatar?: string;
  note?: string;
  contacts: {
    phone?: string;
    email?: string;
    telegram?: string;
    whatsapp?: string;
  };
};
