import type { FC } from 'react';
import { Box, Button, Container, Input, SegmentedControl, Stack, Title } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { PropertyList } from './components/property-list';
import { useLoaderData, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import type { Property } from '../../data/entities/property';
import { propertyStore } from '../../data/stores';
import { observer } from 'mobx-react-lite';

export const MainPage: FC = observer(() => {
  const navigate = useNavigate();

  const [dealType, setDealType] = useState<'all' | 'sale' | 'rent'>('all');

  useEffect(() => {
    propertyStore.loadProperties();
  }, []);

  const properties = propertyStore.properties;

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
            data={[
              { label: 'Всё', value: 'all' },
              { label: 'Продажа', value: 'sale' },
              { label: 'Аренда', value: 'rent' },
            ]}
            value={dealType}
            onChange={(value) => setDealType(value as 'all' | 'sale' | 'rent')}
          />
        </Stack>
        {(dealType === 'all' || dealType === 'sale') && (
          <>
            <Title
              order={3}
              px='md'
            >
              Продажа{' '}
              <Box
                display='inline-block'
                c='dimmed'
              >
                {properties.filter((property) => property.dealType === 'sale').length}
              </Box>
            </Title>
            <PropertyList properties={properties.filter((property) => property.dealType === 'sale')} />
          </>
        )}
        {(dealType === 'all' || dealType === 'rent') && (
          <>
            <Title
              order={3}
              px='md'
            >
              Аренда{' '}
              <Box
                display='inline-block'
                c='dimmed'
              >
                {properties.filter((property) => property.dealType === 'rent').length}
              </Box>
            </Title>
            <PropertyList properties={properties.filter((property) => property.dealType === 'rent')} />
          </>
        )}
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
});
