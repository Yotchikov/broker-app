import type { FC } from 'react';
import styles from './property-list.module.css';
import { useLoaderData, useNavigate } from 'react-router';
import type { Property } from 'data';
import { Cell, Divider, Section, Text } from 'ui-kit';
import ChevronRight16 from 'ui-kit/icons/svgs/chevron-right-16.svg?react';
import { Price } from '../../../../app/components';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg?react';

export const PropertyList: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const navigate = useNavigate();

  return (
    <Section title='Объекты'>
      {properties.map((property) => (
        <Cell
          key={property.id}
          subtitle={
            property.price && (
              <Price
                amount={property.price.amount}
                currency={property.price.currency!}
              />
            )
          }
          before={<div className={styles.image} />}
          after={<ChevronRight16 />}
          onClick={() => {
            navigate(`/properties/${property.id}`);
          }}
        >
          {property.name}
        </Cell>
      ))}
      <Divider />
      <Cell
        onClick={() => {
          navigate('/properties/create');
        }}
        before={<AddCircle28 color='var(--color-blue-500)' />}
      >
        <Text color='info'>Добавить объект</Text>
      </Cell>
    </Section>
  );
};
