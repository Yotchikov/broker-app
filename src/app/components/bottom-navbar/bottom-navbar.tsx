import { Box, Card, Group, Stack, Text } from '@mantine/core';
import {
  IconBuildingPlus,
  IconEye,
  IconEyeFilled,
  IconHome,
  IconHomeFilled,
  IconSettings,
  IconSettingsFilled,
  IconUserPlus,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router';
import { BOTTOM_NAVBAR_HEIGHT } from './consts';
import styles from './bottom-navbar.module.css';
import { IconBuildingPlusFilled, IconUserPlusFilled } from '../custom-icons';

const BOTTOM_NAVBAR_ITEMS = [
  {
    id: 'home',
    Icon: IconHome,
    IconCurrent: IconHomeFilled,
    path: '/',
    label: 'Объекты',
  },
  {
    id: 'showings',
    Icon: IconEye,
    IconCurrent: IconEyeFilled,
    path: '/showings',
    label: 'Показы',
  },
  {
    id: 'create-property',
    Icon: IconBuildingPlus,
    IconCurrent: IconBuildingPlusFilled,
    path: '/properties/create',
    label: 'Объект',
  },
  {
    id: 'create-property',
    Icon: IconUserPlus,
    IconCurrent: IconUserPlusFilled,
    path: '/prospects/create',
    label: 'Клиент',
  },
  {
    id: 'settings',
    Icon: IconSettings,
    IconCurrent: IconSettingsFilled,
    path: '/settings',
    label: 'Настройки',
  },
];

export const BottomNavbar = () => {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <Card
      pos='fixed'
      bottom={32}
      left={16}
      right={16}
      p={0}
      radius='lg'
      shadow='md'
      className={styles.bottomNavbar}
    >
      <Group
        justify='space-evenly'
        wrap='nowrap'
        h={BOTTOM_NAVBAR_HEIGHT}
      >
        {BOTTOM_NAVBAR_ITEMS.map((item) => (
          <Box
            key={item.id}
            style={{
              color: currentPath === item.path ? 'var(--mantine-primary-color-filled)' : 'var(--mantine-color-text)',
            }}
            onClick={() => navigate(item.path)}
          >
            <Stack
              gap='0'
              align='center'
            >
              {currentPath === item.path ? (
                <item.IconCurrent
                  size={28}
                  stroke={1.8}
                />
              ) : (
                <item.Icon
                  size={28}
                  stroke={1.8}
                />
              )}
              <Text
                size='xs'
                fw='bold'
              >
                {item.label}
              </Text>
            </Stack>
          </Box>
        ))}
      </Group>
    </Card>
  );
};
