import type { FC } from 'react';
import styles from './property-page.module.css';
import { PropertyInfo, PropertyOwner } from './components';

export const PropertyPage: FC = () => {
  return (
    <div className={styles.propertyPage}>
      <PropertyInfo />
      <PropertyOwner />
    </div>
  );
};
