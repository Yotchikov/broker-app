import type { FC } from 'react';
import type { CellProps } from './cell.types';
import styles from './cell.module.css';
import { Text } from '../text';
import clsx from 'clsx';

export const Cell: FC<CellProps> = (props) => {
  const { before, children, after, subtitle, onClick } = props;

  return (
    <div
      className={clsx(styles.cell, onClick && styles.interactive)}
      onClick={onClick}
    >
      {before && <div className={styles.before}>{before}</div>}
      <div className={styles.middle}>
        {children && (
          <Text
            size='m'
            weight='regular'
          >
            {children}
          </Text>
        )}
        {subtitle && (
          <Text
            size='s'
            weight='regular'
            color='secondary'
          >
            {subtitle}
          </Text>
        )}
      </div>
      {after && <div className={styles.after}>{after}</div>}
    </div>
  );
};
