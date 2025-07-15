import type { FC } from 'react';
import styles from './property-header.module.css';
import { Text } from 'ui-kit';

import type { Property } from 'data';
import { useLoaderData } from 'react-router';
import { Price } from '../../../../app/components';

const DEAL_TYPE_LABELS = {
  sale: 'Продажа',
  rent: 'Аренда',
};

export const PropertyHeader: FC = () => {
  const { property } = useLoaderData<{ property: Property }>();
  const { name, price, dealType } = property;

  return (
    <div className={styles.header}>
      <div className={styles.image}></div>
      <div className={styles.textBlock}>
        <Text
          size='2xl'
          weight='semibold'
          as='h1'
          align='center'
        >
          {name}
        </Text>
        <Text
          size='m'
          weight='regular'
          as='h2'
          color='secondary'
          align='center'
        >
          {DEAL_TYPE_LABELS[dealType]}
          {price && (
            <>
              {' ⸱ '}
              <Price
                amount={price.amount}
                currency={price.currency}
              />
            </>
          )}
        </Text>
      </div>
    </div>
  );
};
