import type { FC } from 'react';
import type { CellProps } from './cell.types';
import styles from './cell.module.css';
import { Text } from '../text';
import clsx from 'clsx';

export const Cell: FC<CellProps> = (props) => {
  const { before, children, after, subtitle, subhead, className, onClick } = props;

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

  const beforeNode =
    typeof before === 'string' ? (
      <Text
        size='m'
        weight='regular'
      >
        {before}
      </Text>
    ) : (
      before
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

  const subheadNode =
    typeof subhead === 'string' ? (
      <Text
        size='s'
        weight='regular'
        color='secondary'
      >
        {subhead}
      </Text>
    ) : (
      subhead
    );

  return (
    <div
      className={clsx(className, styles.cell, onClick && styles.interactive)}
      onClick={onClick}
    >
      {beforeNode && <div className={styles.before}>{beforeNode}</div>}
      <div className={styles.middle}>
        {subheadNode}
        {childrenNode}
        {subtitleNode}
      </div>
      {after && <div className={styles.after}>{after}</div>}
    </div>
  );
};
