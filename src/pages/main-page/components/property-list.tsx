import { Accordion, Stack, Text } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import styles from '../main-page.module.css';
import { PropertyListItem } from './property-list-item';
import { IconMoodConfuzed } from '@tabler/icons-react';

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
      >
        <IconMoodConfuzed size={48} />
        <Text ta='center'>Пока здесь пусто</Text>
      </Stack>
    );
  }

  return (
    <>
      <Accordion
        chevronPosition='left'
        classNames={{ chevron: styles.chevron }}
      >
        {properties.map((property) => (
          <PropertyListItem
            key={property.id}
            property={property}
          />
        ))}
      </Accordion>
    </>
  );
};
