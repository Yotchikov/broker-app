import type { BaseEntity } from './base-entity';
import type { Price } from './price';

export type Property = BaseEntity & {
  floor?: {
    number?: number;
    total?: number;
  };
  price?: Price;
  ownerId?: string;
  prospectIds: string[];
  dealType: 'sale' | 'rent';
  area?: number;
  note?: string;
};
