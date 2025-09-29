import { Accordion, Divider, Stack, Text, UnstyledButton } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import styles from '../main-page.module.css';
import { PropertyListItem } from './property-list-item';
import { IconHomePlus } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router';

type PropertyListProps = {
  properties: Property[];
};

export const PropertyList = (props: PropertyListProps) => {
  const { properties } = props;

  const navigate = useNavigate();

  if (properties.length === 0) {
    return (
      <UnstyledButton onClick={() => navigate('/properties/create')}>
        <Stack
          p='xl'
          align='center'
          gap='md'
        >
          <IconHomePlus size={48} />
          <Text ta='center'>Добавьте объект</Text>
        </Stack>
      </UnstyledButton>
    );
  }

  return (
    <>
      <Accordion
        chevronPosition='left'
        classNames={{ chevron: styles.chevron }}
        variant='unstyled'
      >
        {properties.map((property, index) => (
          <React.Fragment key={property.id}>
            <PropertyListItem property={property} />
            {index !== properties.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Accordion>
    </>
  );
};
