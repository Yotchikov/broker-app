import type { FC } from 'react';
import { Cell, Section } from '../../../../../packages/ui-kit';
import type { Property } from '../../../../data';
import { useLoaderData } from 'react-router';
import InfoCircle28 from 'ui-kit/icons/svgs/info-circle-28.svg?react';

export const PropertyInfo: FC = () => {
  const { property } = useLoaderData<{ property: Property }>();
  const { area, floor } = property;

  return (
    <Section title='Информация'>
      {area && (
        <Cell
          before={
            <InfoCircle28
              width={28}
              height={28}
              color='var(--color-blue-500)'
            />
          }
          subtitle='Площадь'
        >
          {`${area / 100} м²`}
        </Cell>
      )}
      {floor && (
        <Cell
          before={<></>}
          subtitle='Этаж'
        >
          {floor.number} из {floor.total}
        </Cell>
      )}
    </Section>
  );
};
