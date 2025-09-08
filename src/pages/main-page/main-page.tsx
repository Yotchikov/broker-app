import type { FC } from 'react';
import {
  Accordion,
  Avatar,
  Button,
  Container,
  Grid,
  Group,
  Input,
  Menu,
  NumberFormatter,
  SegmentedControl,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  IconAt,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconDotsVertical,
  IconPencil,
  IconPhone,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { useLoaderData } from 'react-router';
import type { Property } from '../../data/entities/property';

export const MainPage: FC = () => {
  const { properties } = useLoaderData<{ properties: Property[] }>();

  if (!properties) {
    return null;
  }

  return (
    <Container>
      <Stack
        gap='sm'
        py='sm'
      >
        <Input
          placeholder='Поиск'
          leftSection={<IconSearch size={16} />}
        />
        <SegmentedControl
          fullWidth
          data={['Всё', 'Аренда', 'Продажа']}
        />
        <Accordion>
          {properties.map((property) => (
            <Accordion.Item value={property.id}>
              <Accordion.Control>
                <Group
                  align='flex-start'
                  gap='xs'
                >
                  <Avatar
                    radius='xl'
                    name={property.name}
                    color='initials'
                  />
                  <Stack gap={0}>
                    {property.name}
                    {property.price && (
                      <Text size='xs'>
                        <NumberFormatter
                          value={property.price.amount / 100}
                          suffix={property.price.currency}
                          thousandSeparator
                        />
                      </Text>
                    )}
                  </Stack>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  <Stack gap={'xs'}>
                    <Text size='xs'>Собственник</Text>
                    <Group justify='space-between'>
                      <Group gap='xs'>
                        <Avatar
                          radius='xl'
                          name={property.name}
                          color='initials'
                        />
                        <Text>Константин Златопольский</Text>
                      </Group>
                      <Menu position='bottom-end'>
                        <Menu.Target>
                          <UnstyledButton size='xs'>
                            <IconDotsVertical size={16} />
                          </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Label>Контакты</Menu.Label>
                          <Menu.Item leftSection={<IconPhone size={14} />}>+7 (999) 999-99-99</Menu.Item>
                          <Menu.Item leftSection={<IconBrandWhatsapp size={14} />}>+7 (999) 999-99-99</Menu.Item>
                          <Menu.Item leftSection={<IconBrandTelegram size={14} />}>yotchikov</Menu.Item>
                          <Menu.Item leftSection={<IconAt size={14} />}>yotchikov@gmail.com</Menu.Item>
                          <Menu.Item leftSection={<IconPlus size={14} />}>Добавить контакт</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconPencil size={14} />}>Редактировать</Menu.Item>
                          <Menu.Item leftSection={<IconTrash size={14} />}>Удалить</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Stack>
                  <Grid>
                    <Grid.Col span={6}>
                      <Button
                        variant='light'
                        color='blue'
                        leftSection={<IconPencil size={16} />}
                        fullWidth
                      >
                        Редактировать
                      </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Button
                        variant='light'
                        color='red'
                        leftSection={<IconTrash size={16} />}
                        fullWidth
                      >
                        Удалить
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Button
          variant='light'
          leftSection={<IconPlus size={16} />}
        >
          Добавить объект
        </Button>
      </Stack>
    </Container>
  );
};
