import type { FC } from 'react';
import { Text } from 'ui-kit';
import styles from './main.module.css';
import { PropertyList } from './components';

export const Main: FC = () => {
  return (
    <div className={styles.main}>
      <Text
        size='2xl'
        weight='semibold'
        as='h1'
      >
        Объекты
      </Text>
      <PropertyList />
    </div>
  );
};
