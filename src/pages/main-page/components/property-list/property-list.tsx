import type { FC } from 'react';
import styles from './property-list.module.css';
import { useLoaderData, useNavigate } from 'react-router';
import type { Property } from 'data';
import { Cell } from 'ui-kit';
import ChevronRight16 from 'ui-kit/icons/svgs/chevron-right-16.svg';
import { Price } from '../../../../app/components';

export const PropertyList: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const navigate = useNavigate();

  return (
    <ul className={styles.list}>
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
    </ul>
  );
};
