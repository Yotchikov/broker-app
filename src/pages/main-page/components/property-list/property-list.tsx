import type { FC } from 'react';
import styles from './property-list.module.css';
import { useLoaderData, useNavigate } from 'react-router';
import type { Property } from 'data';
import { Cell } from 'ui-kit';
import { PropertyPrice } from './elements/property-price';
import ChevronRight16 from 'ui-kit/icons/svgs/chevron-right-16.svg';

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
              <PropertyPrice
                amount={property.price.amount}
                currency={property.price.currency!}
              />
            )
          }
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
