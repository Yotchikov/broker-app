import type { FC } from 'react';

import type { Currency } from 'data';
import { getPrice } from './price.utils';

type PriceProps = {
  amount: number;
  currency: Currency;
};

export const Price: FC<PriceProps> = ({ amount, currency }) => {
  return getPrice(amount, currency);
};
