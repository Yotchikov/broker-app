import { Accordion, Button, Stack, Text } from '@mantine/core';
import type { Property } from '../../../data/entities/property';
import styles from '../main-page.module.css';
import { PropertyListItem } from './property-list-item';
import { IconMoodSad, IconPlus } from '@tabler/icons-react';
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
      <Stack
        p='xl'
        align='center'
        gap='xl'
        c='dimmed'
      >
        <Stack
          align='center'
          gap='xs'
        >
          <IconMoodSad size={48} />
          <Text ta='center'>Пока нет объектов</Text>
        </Stack>
        <Button
          leftSection={<IconPlus size={16} />}
          size='md'
          radius='xl'
          onClick={() => navigate('/properties/create')}
        >
          Добавить
        </Button>
      </Stack>
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
