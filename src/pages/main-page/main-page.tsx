import type { FC } from 'react';
import { Button, Container, Input, SegmentedControl, Stack } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useLoaderData } from 'react-router';
import type { Property } from '../../data/entities';
import { PropertyList } from './components/property-list';
import { useNavigate } from 'react-router';

export const MainPage: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const navigate = useNavigate();

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
          onClick={() => {
            navigate('/properties/create');
          }}
        >
          Добавить объект
        </Button>
      </Stack>
    </Container>
  );
};
