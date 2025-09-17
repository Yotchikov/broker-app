import { ActionIcon, Group } from '@mantine/core';
import { IconHome, IconSettings } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router';
import { BOTTOM_NAVBAR_HEIGHT } from './consts';

export const BottomNavbar = () => {
  const currentPath = useLocation().pathname;

  return (
    <Group
      gap={40}
      justify='center'
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
      <ActionIcon
        size='xl'
        variant='transparent'
        color={currentPath === '/' ? 'var(--mantine-color-bright)' : 'default'}
        aria-label='Home'
        component={Link}
        to='/'
      >
        <IconHome
          size={28}
          stroke={1.8}
        />
      </ActionIcon>

      <ActionIcon
        size='xl'
        variant='transparent'
        color={currentPath === '/settings' ? 'var(--mantine-color-bright)' : 'default'}
        aria-label='Settings'
        component={Link}
        to='/settings'
      >
        <IconSettings
          size={28}
          stroke={1.8}
        />
      </ActionIcon>
    </Group>
  );
};
