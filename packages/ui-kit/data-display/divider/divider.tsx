import type { FC } from 'react';
import styles from './divider.module.css';

export const Divider: FC = () => {
  return <hr className={styles.divider} />;
};
