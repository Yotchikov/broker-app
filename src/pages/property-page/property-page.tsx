import type { FC } from 'react';
import { PropertyHeader, PropertyInfo, PropertyOwner, PropertyProspects } from './components';
import { PageLayout } from '../../../packages/ui-kit';

export const PropertyPage: FC = () => {
  return (
    <PageLayout>
      <PropertyHeader />
      <PropertyInfo />
      <PropertyOwner />
      <PropertyProspects />
    </PageLayout>
  );
};
