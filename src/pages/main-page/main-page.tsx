import type { FC } from 'react';
import { Button, Container, Input, SegmentedControl, Stack } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useLoaderData } from 'react-router';
import type { Property } from '../../data/entities';
import { PropertyList } from './components/property-list';

export const MainPage: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();

  if (!properties) {
    return null;
  }

  return (
    <Container>
      <Stack
        gap='sm'
        py='sm'
      >
        <Input
          placeholder='Поиск'
          leftSection={<IconSearch size={16} />}
        />
        <SegmentedControl
          fullWidth
          data={['Всё', 'Аренда', 'Продажа']}
        />
        <PropertyList />
        <Button
          variant='light'
          leftSection={<IconPlus size={16} />}
        >
          Добавить объект
        </Button>
      </Stack>
    </Container>
  );
};
