import { Container, Group, Stack, Switch, Text, Title, useMantineColorScheme } from '@mantine/core';
import { IconMoon } from '@tabler/icons-react';

export const SettingsPage = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Container p={0}>
      <Stack
        py='sm'
        px='md'
        gap='md'
      >
        <Title order={3}>Настройки</Title>
        <Group justify='space-between'>
          <Group>
            <IconMoon size={16} />
            <Text>Тёмная тема</Text>
          </Group>
          <Switch
            checked={colorScheme === 'dark'}
            onChange={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
          />
        </Group>
      </Stack>
    </Container>
  );
};
