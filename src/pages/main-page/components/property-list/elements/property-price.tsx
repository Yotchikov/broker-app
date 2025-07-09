import type { FC } from 'react';
import type { Currency } from 'src/data';
import { Text } from 'ui-kit';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
};

type PropertyPriceProps = {
  amount: number;
  currency: Currency;
};

export const PropertyPrice: FC<PropertyPriceProps> = (props) => {
  const { amount, currency } = props;

  return (
    <Text
      size='xs'
      color='secondary'
    >
      {amount / 100} {CURRENCY_SYMBOLS[currency]}
    </Text>
  );
};
