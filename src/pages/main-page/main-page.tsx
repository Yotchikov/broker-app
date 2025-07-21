import type { FC } from 'react';
import { PageLayout } from 'ui-kit';
import { PropertyList } from './components';

export const MainPage: FC = () => {
  return (
    <PageLayout>
      <PropertyList />
    </PageLayout>
  );
};
