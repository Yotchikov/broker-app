import { Stack, Space, Text, Button } from '@mantine/core';
import { IconMoodSad, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

export const PropertyListEmptyDisclaimer = () => {
  const navigate = useNavigate();

  return (
    <Stack
      gap='xs'
      px='md'
    >
      <Stack
        px='md'
        py='xs'
        align='stretch'
        gap='xl'
        c='dimmed'
      >
        <Space />
        <Stack
          align='center'
          gap='xs'
        >
          <IconMoodSad
            size={48}
            stroke={1.8}
          />
          <Text ta='center'>Пока нет объектов, чтобы добавить клиента</Text>
        </Stack>
      </Stack>
      <Button
        size='md'
        radius='lg'
        leftSection={
          <IconPlus
            size={16}
            stroke={1.8}
          />
        }
        onClick={() => navigate('/properties/create')}
        variant='light'
      >
        Создать объект
      </Button>
    </Stack>
  );
};
