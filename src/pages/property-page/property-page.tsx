import type { FC } from 'react';
import { PropertyHeader, PropertyInfo, PropertyOwner, PropertyProspects } from './components';
import { PageLayout } from '../../../packages/ui-kit';
import { PageHeader } from '../../app/components';

export const PropertyPage: FC = () => {
  return (
    <PageLayout header={<PageHeader />}>
      <PropertyHeader />
      <PropertyInfo />
      <PropertyOwner />
      <PropertyProspects />
    </PageLayout>
  );
};
