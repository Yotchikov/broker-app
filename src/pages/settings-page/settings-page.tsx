import { Alert, Container, Group, Stack, Switch, Text, Title, useMantineColorScheme } from '@mantine/core';
import { IconInfoCircle, IconMoon } from '@tabler/icons-react';
import type { FC } from 'react';

export const SettingsPage: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Container p={0}>
      <Stack
        py='sm'
        px='md'
        gap='md'
      >
        <Title order={2}>Настройки</Title>
        <Group justify='space-between'>
          <Group>
            <IconMoon size={16} />
            <Text>Тёмная тема</Text>
          </Group>
          <Switch
            size='md'
            checked={colorScheme === 'dark'}
            onChange={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
          />
        </Group>
        <Alert
          variant='light'
          color='blue'
          title='Данное приложение является MVP'
          icon={<IconInfoCircle size={16} />}
        >
          Приложение находится в стадии MVP. Некоторые функции могут быть недоступны или работать некорректно.
          <br />
          По всем вопросам можно писать в Telegram <a href='https://t.me/shkuratov_official'>Грише</a> и{' '}
          <a href='https://t.me/yotchikov'>Антону</a>.
        </Alert>
      </Stack>
    </Container>
  );
};
