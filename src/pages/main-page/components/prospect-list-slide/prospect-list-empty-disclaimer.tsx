import { Stack, Space, Text } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';

export const ProspectListEmptyDisclaimer = () => {
  return (
    <>
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
          <Text ta='center'>У этого объекта пока нет клиентов</Text>
        </Stack>
      </Stack>
    </>
  );
};
