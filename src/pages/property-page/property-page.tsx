import type { FC } from 'react';
import styles from './property-page.module.css';
import { PropertyHeader, PropertyInfo, PropertyOwner, PropertyProspects } from './components';

export const PropertyPage: FC = () => {
  return (
    <div className={styles.propertyPage}>
      <PropertyHeader />
      <PropertyInfo />
      <PropertyOwner />
      <PropertyProspects />
    </div>
  );
};
