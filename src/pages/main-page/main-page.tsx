import type { FC } from 'react';
import { Box, Container, Input, SegmentedControl, Stack, Title, UnstyledButton, Text } from '@mantine/core';
import { IconHomePlus, IconSearch } from '@tabler/icons-react';
import { PropertyList } from './components/property-list';
import { useLoaderData, useNavigate } from 'react-router';
import { useState } from 'react';
import type { Property } from '../../data/entities/property';
import { TOP_NAVBAR_HEIGHT } from '../../app/components';

export const MainPage: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();

  const [dealType, setDealType] = useState<'all' | 'sale' | 'rent'>('all');
  const navigate = useNavigate();

  if (properties.length === 0) {
    return (
      <Container
        p={0}
        mt={-TOP_NAVBAR_HEIGHT}
        w='100%'
        h='100%'
      >
        <Stack
          align='center'
          justify='center'
          w='100%'
          h='100%'
        >
          <UnstyledButton onClick={() => navigate('/properties/create')}>
            <Stack align='center'>
              <IconHomePlus size={48} />
              <Text
                size='lg'
                ta='center'
              >
                Добавьте свой первый объект
              </Text>
            </Stack>
          </UnstyledButton>
        </Stack>
      </Container>
    );
  }

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
              order={2}
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
              order={2}
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
