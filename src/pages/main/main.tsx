import type { FC } from 'react';
import { Text } from 'ui-kit';
import styles from './main.module.css';

export const Main: FC = () => {
  return (
    <div className={styles.main}>
      <Text
        size='2xl'
        weight='bold'
        as='h1'
      >
        Объекты
      </Text>
    </div>
  );
};
