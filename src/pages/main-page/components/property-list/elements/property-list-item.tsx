import type { FC } from 'react';
import styles from '../property-list.module.css';
import { Text } from 'ui-kit';
import ChevronRightIcon from 'ui-kit/icons/svgs/chevron-right.svg';
import type { Property } from 'src/data';
import { PropertyPrice } from './property-price';

type PropertyListItemProps = {
  property: Property;
};

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
  const { property } = props;

  return (
    <li className={styles.item}>
      <a
        className={styles.wrapper}
        href={`/properties/${property.id}`}
      >
        <div className={styles.content}>
          <div className={styles.image} />
          <div className={styles.info}>
            <Text
              size='m'
              weight='regular'
            >
              {property.name}
            </Text>
            {property.price && (
              <PropertyPrice
                amount={property.price.amount}
                currency={property.price.currency}
              />
            )}
          </div>
        </div>
        <ChevronRightIcon />
      </a>
    </li>
  );
};
