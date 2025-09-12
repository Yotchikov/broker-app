import type { BaseEntity } from './base-entity';

export type Owner = BaseEntity & {
  emoji: string;
  contacts: {
    phone?: string;
    email?: string;
    telegram?: string;
    whatsapp?: string;
  };
};
