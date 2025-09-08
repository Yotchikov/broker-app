import { PageLayout } from '../../../packages/ui-kit';
import { PageHeader } from '../../app/components';
import { InformationBlock, OwnerBlock, ProspectsBlock, SubmitButton } from './components';

export const PropertyFormPage = () => {
  return (
    <PageLayout
      header={<PageHeader />}
      footer={<SubmitButton />}
    >
      <InformationBlock />
      <OwnerBlock />
      <ProspectsBlock />
    </PageLayout>
  );
};
