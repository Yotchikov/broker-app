import type { FC } from 'react';
import styles from './property-info.module.css';
import { Text } from 'ui-kit';

import type { Property } from 'data';
import { useLoaderData } from 'react-router';
import { Price } from '../../../../app/components';

export const PropertyInfo: FC = () => {
  const { property } = useLoaderData<{ property: Property }>();

  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <div className={styles.image}></div>
        <div className={styles.textBlock}>
          <Text
            size='2xl'
            weight='semibold'
            as='h1'
            align='center'
          >
            {property.name}
          </Text>
          {property.price && (
            <Text
              size='m'
              weight='regular'
              as='h2'
              color='secondary'
              align='center'
            >
              <Price
                amount={property.price.amount}
                currency={property.price.currency}
              />
            </Text>
          )}
        </div>
      </div>
      <div className={styles.content}></div>
    </div>
  );
};
