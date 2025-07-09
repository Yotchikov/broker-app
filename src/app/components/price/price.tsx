import type { FC } from 'react';

import type { Currency } from 'data';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
};

type PriceProps = {
  amount: number;
  currency: Currency;
};

export const Price: FC<PriceProps> = ({ amount, currency }) => {
  const formattedAmount = (amount / 100).toLocaleString('ru-RU');

  return `${formattedAmount} ${CURRENCY_SYMBOLS[currency]}`;
};
