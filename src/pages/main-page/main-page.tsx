import type { FC } from 'react';
import { Box, Container, Input, SegmentedControl, Stack, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { PropertyList } from './components/property-list';
import { useLoaderData } from 'react-router';
import { useState } from 'react';
import type { Property } from '../../data/entities/property';
import { TOP_NAVBAR_HEIGHT } from '../../app/components';

export const MainPage: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();

  const [dealType, setDealType] = useState<'all' | 'sale' | 'rent'>('all');

  return (
    <Container
      p={0}
      mt={-TOP_NAVBAR_HEIGHT}
    >
      <Stack
        gap='sm'
        py='sm'
      >
        <Stack
          px={'md'}
          gap='sm'
        >
          <Input
            size='md'
            variant='filled'
            placeholder='Поиск'
            leftSection={<IconSearch size={16} />}
          />
          <SegmentedControl
            size='md'
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
      </Stack>
    </Container>
  );
};
