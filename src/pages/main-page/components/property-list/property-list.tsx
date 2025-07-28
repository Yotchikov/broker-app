import type { FC } from 'react';
import styles from './property-list.module.css';
import { useLoaderData, useNavigate } from 'react-router';
import type { Property } from 'data';
import { ButtonCell, Cell, Divider, Section } from 'ui-kit';
import ChevronRight16 from 'ui-kit/icons/svgs/chevron-right-16.svg?react';
import AddCircle28 from 'ui-kit/icons/svgs/add-circle-28.svg?react';
import { getPrice } from '../../../../app/components';

const DEAL_TYPE_LABELS = {
  sale: 'Продажа',
  rent: 'Аренда',
};

export const PropertyList: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const navigate = useNavigate();

  return (
    <Section title='Объекты'>
      {properties.map((property) => (
        <Cell
          key={property.id}
          subhead={DEAL_TYPE_LABELS[property.dealType]}
          subtitle={property.price ? `${getPrice(property.price.amount, property.price.currency)}` : undefined}
          before={<div className={styles.image} />}
          after={<ChevronRight16 color='var(--color-black-500)' />}
          onClick={() => {
            navigate(`/properties/${property.id}`);
          }}
        >
          {property.name}
        </Cell>
      ))}
      <Divider />
      <ButtonCell
        onClick={() => {
          navigate('/properties/create');
        }}
        before={<AddCircle28 color='var(--color-blue-500)' />}
      >
        Добавить объект
      </ButtonCell>
    </Section>
  );
};
