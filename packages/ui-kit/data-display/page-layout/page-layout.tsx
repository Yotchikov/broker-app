import type { FC, PropsWithChildren } from 'react';
import styles from './page-layout.module.css';

export const PageLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <div className={styles.pageLayout}>{children}</div>;
};
