import type { FC } from 'react';
import type { CellProps } from './cell.types';
import styles from './cell.module.css';
import { Text } from '../text';
import clsx from 'clsx';

export const Cell: FC<CellProps> = (props) => {
  const { before, children, after, subtitle, className, onClick } = props;

  const childrenNode =
    typeof children === 'string' ? (
      <Text
        size='m'
        weight='regular'
      >
        {children}
      </Text>
    ) : (
      children
    );

  const subtitleNode =
    typeof subtitle === 'string' ? (
      <Text
        size='s'
        weight='regular'
        color='secondary'
      >
        {subtitle}
      </Text>
    ) : (
      subtitle
    );

  return (
    <div
      className={clsx(className, styles.cell, onClick && styles.interactive)}
      onClick={onClick}
    >
      {before && <div className={styles.before}>{before}</div>}
      <div className={styles.middle}>
        {childrenNode}
        {subtitleNode}
      </div>
      {after && <div className={styles.after}>{after}</div>}
    </div>
  );
};
