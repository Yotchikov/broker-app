import type { FC } from 'react';
import styles from './property-list.module.css';
import { PropertyListItem } from './elements';
import { useLoaderData } from 'react-router';
import type { Property } from 'data';

export const PropertyList: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();

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
