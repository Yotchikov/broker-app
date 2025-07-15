import type { FC } from 'react';
import type { Owner } from '../../../../data';
import { useLoaderData } from 'react-router';
import { Cell, Text } from '../../../../../packages/ui-kit';
import ProfileColoredSquare32 from 'ui-kit/icons/svgs/profile-colored-square-32.svg';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg';

export const PropertyOwner: FC = () => {
  const { owner } = useLoaderData<{ owner?: Owner }>();

  return (
    <div>
      {owner ? (
        <Cell
          before={<ProfileColoredSquare32 />}
          subtitle='Собственник'
        >
          {owner.name}
        </Cell>
      ) : (
        <Cell
          before={
            <AddCircle28
              width={28}
              height={28}
              color='var(--color-blue-500)'
            />
          }
        >
          <Text color='info'>Добавить собственника</Text>
        </Cell>
      )}
    </div>
  );
};
