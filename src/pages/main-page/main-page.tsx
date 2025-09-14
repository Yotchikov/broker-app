import type { FC } from 'react';
import { Box, Button, Container, Input, SegmentedControl, Stack } from '@mantine/core';
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
    <Container p={0}>
      <Stack
        gap='sm'
        py='sm'
      >
        <Stack
          px={'md'}
          gap='sm'
        >
          <Input
            placeholder='Поиск'
            leftSection={<IconSearch size={16} />}
          />
          <SegmentedControl
            fullWidth
            data={['Всё', 'Аренда', 'Продажа']}
          />
        </Stack>
        <PropertyList />
        <Box
          px={'md'}
          w='100%'
        >
          <Button
            variant='light'
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              navigate('/properties/create');
            }}
            fullWidth
          >
            Добавить объект
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
