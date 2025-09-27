import { Button, Group } from '@mantine/core';
import { TOP_NAVBAR_HEIGHT } from './consts';
import { IconChevronLeft } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router';

export const TopNavbar = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  if (currentPath === '/') return null;

  return (
    <Group
      justify='flex-start'
      wrap='nowrap'
      h={TOP_NAVBAR_HEIGHT}
      pos='fixed'
      top={0}
      left={0}
      right={0}
      style={{
        borderBottom: '1px solid var(--mantine-color-default-border)',
      }}
      bg='var(--mantine-color-body)'
    >
      <Button
        variant='transparent'
        leftSection={<IconChevronLeft size={16} />}
        size='md'
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>
    </Group>
  );
};
