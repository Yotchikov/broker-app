import type { FC } from 'react';
import { Box, Container, Input, SegmentedControl, Stack, Text, Button } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { PropertyList } from './components/property-list';
import { useLoaderData, useNavigate } from 'react-router';
import { useState } from 'react';
import type { Property } from '../../data/entities/property';
import { BOTTOM_NAVBAR_HEIGHT } from '../../app/components';
import Logo from '../../../public/images/logo.svg?react';
import { BOTTOM_NAVBAR_BOTTOM_PADDING, BOTTOM_NAVBAR_TOP_PADDING } from '../../app/components/bottom-navbar/consts';

export const MainPage: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();
  const propertiesCount = properties.length;
  const salePropertiesCount = properties.filter((property) => property.dealType === 'sale').length;
  const rentPropertiesCount = properties.filter((property) => property.dealType === 'rent').length;

  const [dealType, setDealType] = useState<'all' | 'sale' | 'rent'>('all');
  const navigate = useNavigate();

  if (propertiesCount === 0) {
    return (
      <Container
        p={0}
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
                color: 'var(--mantine-primary-color-filled)',
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
              radius='lg'
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
    <Container p={0}>
      <Stack
        gap='sm'
        pt='sm'
      >
        <Stack
          px='sm'
          gap='sm'
        >
          <Input
            size='md'
            placeholder='Поиск'
            radius='lg'
            leftSection={<IconSearch size={16} />}
          />
          <Box>
            <SegmentedControl
              color='orange'
              size='lg'
              radius='lg'
              data={[
                {
                  label: `Всё ${propertiesCount}`,
                  value: 'all',
                },
                {
                  label: `Продажа ${salePropertiesCount}`,
                  value: 'sale',
                },
                {
                  label: `Аренда ${rentPropertiesCount}`,
                  value: 'rent',
                },
              ]}
              value={dealType}
              onChange={(value) => setDealType(value as 'all' | 'sale' | 'rent')}
              styles={{
                root: {
                  backgroundColor: 'transparent',
                },
              }}
              withItemsBorders={false}
            />
          </Box>
        </Stack>
        {((dealType === 'all' && properties.some((property) => property.dealType === 'sale')) ||
          dealType === 'sale') && (
          <PropertyList
            properties={properties.filter((property) => property.dealType === 'sale')}
            dealType='sale'
          />
        )}
        {((dealType === 'all' && properties.some((property) => property.dealType === 'rent')) ||
          dealType === 'rent') && (
          <PropertyList
            properties={properties.filter((property) => property.dealType === 'rent')}
            dealType='rent'
          />
        )}
      </Stack>
      <Box h={BOTTOM_NAVBAR_HEIGHT + BOTTOM_NAVBAR_BOTTOM_PADDING + BOTTOM_NAVBAR_TOP_PADDING} />
    </Container>
  );
};
