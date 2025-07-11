import type { FC } from 'react';
import type { Owner } from '../../../../data';
import { useLoaderData } from 'react-router';
import styles from './property-owner.module.css';

export const PropertyOwner: FC = () => {
  const { owner } = useLoaderData<{ owner?: Owner }>();

  if (!owner) {
    return null;
  }

  return <div className={styles.owner}>{owner?.name}</div>;
};
