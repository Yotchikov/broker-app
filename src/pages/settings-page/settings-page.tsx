import { Blockquote, Container, Group, Stack, Switch, Text, Title, useMantineColorScheme } from '@mantine/core';
import { IconInfoCircle, IconMoon } from '@tabler/icons-react';
import type { FC } from 'react';

export const SettingsPage: FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Container p={0}>
      <Stack
        py='sm'
        px='sm'
        gap='md'
      >
        <Title order={2}>Настройки</Title>
        <Blockquote
          variant='light'
          color='blue'
          icon={<IconInfoCircle />}
        >
          <Stack gap='md'>
            <Title order={5}>Вы пользуетесь MVP</Title>
            <Text size='sm'>Некоторые функции могут быть недоступны или работать некорректно.</Text>
            <Text size='sm'>
              По всем вопросам можно писать в Telegram <a href='https://t.me/shkuratov_official'>Григорию</a> и{' '}
              <a href='https://t.me/yotchikov'>Антону</a>.
            </Text>
          </Stack>
        </Blockquote>
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
      </Stack>
    </Container>
  );
};
