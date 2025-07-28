import type { FC } from 'react';
import styles from './page-layout.module.css';
import type { PageLayoutProps } from './page-layout.types';

export const PageLayout: FC<PageLayoutProps> = (props) => {
  const { children, header, footer } = props;

  return (
    <div className={styles.pageLayout}>
      {header && <header className={styles.header}>{header}</header>}
      <main className={styles.main}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
};
