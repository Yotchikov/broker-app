import { ActionIcon, Group } from '@mantine/core';
import { IconHome, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router';
import { BOTTOM_NAVBAR_HEIGHT } from './consts';

export const BottomNavbar = () => {
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
        borderTop: '1px solid var(--mantine-color-gray-5)',
      }}
    >
      <ActionIcon
        size='xl'
        radius='xl'
        variant='subtle'
        color={'gray'}
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
        radius='xl'
        variant='subtle'
        color={'gray'}
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
