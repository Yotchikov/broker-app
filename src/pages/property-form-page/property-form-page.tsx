import { Cell, Divider, Input, PageLayout, Section } from '../../../packages/ui-kit';

export const PropertyFormPage = () => {
  return (
    <PageLayout>
      <Section title='Новый объект'>
        <Cell>
          <Input placeholder='Название' />
        </Cell>
        <Cell></Cell>
      </Section>
    </PageLayout>
  );
};
