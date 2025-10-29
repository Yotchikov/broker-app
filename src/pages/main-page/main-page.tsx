import type { FC } from 'react';
import { Box, Container, Input, SegmentedControl, Stack, Title, Text, Button } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { PropertyList } from './components/property-list';
import { useLoaderData, useNavigate } from 'react-router';
import { useState } from 'react';
import type { Property } from '../../data/entities/property';
import { TOP_NAVBAR_HEIGHT } from '../../app/components';
import Logo from '../../../public/images/logo.svg?react';

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
          <Stack
            align='center'
            gap='xl'
          >
            <Logo
              style={{
                maxWidth: 200,
                width: 'auto',
                height: 'auto',
              }}
            />
            <Text
              size='lg'
              ta='center'
            >
              Приложение для управления
              <br />
              объектами недвижимости,
              <br />
              собственниками и клиентами
            </Text>
            <Button
              leftSection={<IconPlus size={18} />}
              size='lg'
              radius='xl'
              onClick={() => navigate('/properties/create')}
            >
              Добавить первый объект
            </Button>
          </Stack>
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
          px='sm'
          gap='sm'
        >
          <Input
            size='md'
            placeholder='Поиск'
            radius='xl'
            leftSection={<IconSearch size={16} />}
          />
          <SegmentedControl
            size='md'
            radius='xl'
            fullWidth
            data={[
              { label: 'Всё', value: 'all' },
              { label: 'Продажа', value: 'sale' },
              { label: 'Аренда', value: 'rent' },
            ]}
            value={dealType}
            onChange={(value) => setDealType(value as 'all' | 'sale' | 'rent')}
            styles={{
              root: {
                backgroundColor: 'transparent',
              },
            }}
          />
        </Stack>
        {((dealType === 'all' && properties.some((property) => property.dealType === 'sale')) ||
          dealType === 'sale') && (
          <>
            <Title
              order={2}
              px='sm'
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
        {((dealType === 'all' && properties.some((property) => property.dealType === 'rent')) ||
          dealType === 'rent') && (
          <>
            <Title
              order={2}
              px='sm'
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
