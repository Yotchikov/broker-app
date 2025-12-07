import { Accordion, Button } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import styles from '../main-page.module.css';
import { PropertyListItem } from './property-list-item';
import React from 'react';
import { useNavigate } from 'react-router';
import { EmptyDisclaimer } from '../../../app/components';
import { IconPlus } from '@tabler/icons-react';

type PropertyListProps = {
  properties: Property[];
  dealType: 'sale' | 'rent';
};

export const PropertyList = (props: PropertyListProps) => {
  const { properties, dealType } = props;

  const navigate = useNavigate();

  if (properties.length === 0) {
    return (
      <EmptyDisclaimer
        title='Пока нет объектов'
        description={
          <>
            Добавьте первый объект с типом "{dealType === 'sale' ? 'продажа' : 'аренда'}",
            <br />и он появится здесь
          </>
        }
        button={
          <Button
            fullWidth
            size='md'
            radius='lg'
            leftSection={
              <IconPlus
                size={16}
                stroke={1.8}
              />
            }
            variant='light'
            onClick={() => navigate('/properties/create')}
          >
            Добавить объект
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Accordion
        chevronPosition='left'
        classNames={{ chevron: styles.chevron }}
        variant='unstyled'
        styles={{ content: { paddingRight: 0, paddingLeft: 0 } }}
      >
        {properties.map((property) => (
          <React.Fragment key={property.id}>
            <PropertyListItem property={property} />
          </React.Fragment>
        ))}
      </Accordion>
    </>
  );
};
