import type { FC } from 'react';
import styles from './section.module.css';
import type { SectionProps } from './section.types';
import { Text } from '../text';

export const Section: FC<SectionProps> = (props) => {
  const { title, children } = props;

  const titleNode =
    typeof title === 'string' ? (
      <Text
        size='m'
        weight='semibold'
        as='h1'
      >
        {title}
      </Text>
    ) : (
      title
    );

  return (
    <div className={styles.section}>
      {titleNode && <header className={styles.title}>{titleNode}</header>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};
