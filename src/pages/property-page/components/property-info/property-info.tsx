import type { FC } from 'react';
import styles from './property-info.module.css';
import { Text } from 'ui-kit';

import type { Property } from 'data';
import { useLoaderData } from 'react-router';
import { Price } from '../../../../app/components';

const DEAL_TYPE_LABELS = {
  sale: 'Продажа',
  rent: 'Аренда',
};

export const PropertyInfo: FC = () => {
  const { property } = useLoaderData<{ property: Property }>();
  const { name, price, floor, dealType, area } = property;

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
      <div className={styles.content}>
        {area && (
          <>
            <Text
              size='s'
              weight='regular'
              color='secondary'
            >
              Площадь
            </Text>
            <Text
              size='s'
              weight='regular'
            >
              {area / 100} м²
            </Text>
          </>
        )}
        {floor && (
          <>
            <Text
              size='s'
              weight='regular'
              color='secondary'
            >
              Этаж
            </Text>
            <Text
              size='s'
              weight='regular'
            >
              {floor.number} из {floor.total}
            </Text>
          </>
        )}
      </div>
    </div>
  );
};
