import { Stack, Space, Text } from '@mantine/core';
import { IconMoodPuzzled } from '@tabler/icons-react';
import type { FC } from 'react';

type EmptyDisclaimerProps = {
  title: string;
  description?: React.ReactNode;
  button?: React.ReactNode;
};

export const EmptyDisclaimer: FC<EmptyDisclaimerProps> = (props) => {
  const { title, description, button } = props;

  return (
    <Stack
      py='sm'
      px='sm'
      gap='md'
      h={'100%'}
      justify='center'
    >
      <Space />
      <Stack
        align='center'
        gap='xs'
      >
        <IconMoodPuzzled
          size={48}
          stroke={1.8}
          color='var(--mantine-color-dimmed)'
        />
        <Text
          ta='center'
          fw='bold'
          size='lg'
        >
          {title}
        </Text>
        {description && (
          <Text
            ta='center'
            c='dimmed'
          >
            {description}
          </Text>
        )}
        <Space />
        {button}
      </Stack>
    </Stack>
  );
};
