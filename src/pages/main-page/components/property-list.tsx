import { Accordion, Divider, Stack, Text } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import styles from '../main-page.module.css';
import { PropertyListItem } from './property-list-item';
import { IconMoodSad } from '@tabler/icons-react';
import React from 'react';

type PropertyListProps = {
  properties: Property[];
};

export const PropertyList = (props: PropertyListProps) => {
  const { properties } = props;

  if (properties.length === 0) {
    return (
      <Stack
        p='xl'
        align='center'
        gap='md'
      >
        <IconMoodSad size={48} />
        <Text ta='center'>Пока нет объектов</Text>
      </Stack>
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
