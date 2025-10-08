import { ActionIcon, Group } from '@mantine/core';
import {
  IconCirclePlus,
  IconCirclePlusFilled,
  IconHome,
  IconHomeFilled,
  IconSettings,
  IconSettingsFilled,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router';
import { BOTTOM_NAVBAR_HEIGHT } from './consts';

const BOTTOM_NAVBAR_ITEMS = [
  {
    id: 'home',
    Icon: IconHome,
    IconCurrent: IconHomeFilled,
    path: '/',
  },
  {
    id: 'create-property',
    Icon: IconCirclePlus,
    IconCurrent: IconCirclePlusFilled,
    path: '/properties/create',
  },

  {
    id: 'settings',
    Icon: IconSettings,
    IconCurrent: IconSettingsFilled,
    path: '/settings',
  },
];

export const BottomNavbar = () => {
  const currentPath = useLocation().pathname;

  return (
    <Group
      justify='space-around'
      wrap='nowrap'
      h={BOTTOM_NAVBAR_HEIGHT}
      pos='fixed'
      bottom={0}
      left={0}
      right={0}
      style={{
        borderTop: '1px solid var(--mantine-color-default-border)',
      }}
      bg='var(--mantine-color-body)'
    >
      {BOTTOM_NAVBAR_ITEMS.map((item) => (
        <ActionIcon
          size='xl'
          key={item.id}
          variant='transparent'
          color='default'
          component={Link}
          to={item.path}
          aria-label={item.id}
        >
          {currentPath === item.path ? (
            <item.IconCurrent
              size={28}
              stroke={1.8}
              color='var(--mantine-primary-color-filled)'
            />
          ) : (
            <item.Icon
              size={28}
              stroke={1.8}
            />
          )}
        </ActionIcon>
      ))}
    </Group>
  );
};
