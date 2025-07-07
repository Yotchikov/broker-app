import styles from './property-list.module.css';
import type { Property } from '../../../../domain';
import { PropertyListItem } from './elements';

const properties: Property[] = [
  {
    id: '1',
    name: 'ЖК Волоколамское 24',
    price: {
      amount: 1000000,
      currency: 'RUB',
    },
    ownerId: '1',
    prospectIds: ['1', '2', '3'],
  },
  {
    id: '2',
    name: 'Куусинена 4Ак5',
    price: {
      amount: 1000000,
      currency: 'RUB',
    },
    ownerId: '1',
    prospectIds: ['1', '2', '3'],
  },
];

export const PropertyList = () => {
  return (
    <ul className={styles.list}>
      {properties.map((property) => (
        <PropertyListItem
          key={property.id}
          property={property}
        />
      ))}
    </ul>
  );
};
