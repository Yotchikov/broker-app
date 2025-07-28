import type { Currency } from '../../../data';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
};

export const getPrice = (amount: number, currency: Currency) => {
  const formattedAmount = (amount / 100).toLocaleString('ru-RU');

  return `${formattedAmount} ${CURRENCY_SYMBOLS[currency]}`;
};
