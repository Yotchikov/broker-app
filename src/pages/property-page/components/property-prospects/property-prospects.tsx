import { useLoaderData } from 'react-router';
import { Cell, Divider, Text } from '../../../../../packages/ui-kit';
import type { Prospect } from 'data';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg';
import ChevronRight16 from 'ui-kit/icons/svgs/chevron-right-16.svg';

export const PropertyProspects = () => {
  const { prospects } = useLoaderData<{ prospects: Prospect[] }>();

  return (
    <>
      <Text
        as='h2'
        size='l'
        weight='bold'
      >
        Клиенты
      </Text>
      <div>
        {prospects.map((prospect) => (
          <Cell
            before={<div />}
            after={<ChevronRight16 />}
            key={prospect.id}
            onClick={() => {}}
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
      </div>
    </>
  );
};
