import { Accordion, Button, Divider, Stack, Text } from '@mantine/core';
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
        gap='md'
        c='dimmed'
      >
        <IconMoodSad size={48} />
        <Text ta='center'>Пока нет объектов</Text>
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
      >
        {properties.map((property, index) => (
          <React.Fragment key={property.id}>
            <PropertyListItem property={property} />
            {index !== properties.length - 1 && (
              <Divider
                ml={106}
                mr={16}
              />
            )}
          </React.Fragment>
        ))}
      </Accordion>
    </>
  );
};
