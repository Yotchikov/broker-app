import { useLoaderData } from 'react-router';
import { Cell, Divider, Section, Text } from '../../../../../packages/ui-kit';
import type { Prospect } from 'data';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg?react';
import ChevronRight16 from 'ui-kit/icons/svgs/chevron-right-16.svg?react';

export const PropertyProspects = () => {
  const { prospects } = useLoaderData<{ prospects: Prospect[] }>();

  return (
    <Section title='Клиенты'>
      {prospects.map((prospect) => (
        <Cell
          before={<div />}
          after={<ChevronRight16 />}
          key={prospect.id}
          onClick={() => {}}
          subtitle={'Ждет показа'}
        >
          {prospect.name}
        </Cell>
      ))}
      {prospects.length > 0 && <Divider />}
      <Cell
        before={<AddCircle28 color='var(--color-blue-500)' />}
        onClick={() => {}}
      >
        <Text color='info'>Добавить клиента</Text>
      </Cell>
    </Section>
  );
};
