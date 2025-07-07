import type { FC } from 'react';
import styles from '../property-list.module.css';
import { Button, ChevronDownIcon, Text } from 'ui-kit';
import type { Property } from '../../../../../domain';

type PropertyListItemProps = {
  property: Property;
};

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
  const { property } = props;

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <div className={styles.icon} />
        <div className={styles.info}>
          <Text
            size='m'
            weight='semibold'
          >
            {property.name}
          </Text>
          {property.price && (
            <Text
              size='xs'
              color='secondary'
            >
              {property.price.amount} {'₽'}
            </Text>
          )}
        </div>
      </div>
      <Button
        size='s'
        variant='ghost'
        icon={<ChevronDownIcon />}
      />
    </li>
  );
};
