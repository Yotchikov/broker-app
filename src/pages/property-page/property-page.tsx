import type { FC } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  ActionIcon,
  ThemeIcon,
} from '@mantine/core';
import { IconChevronLeft, IconPlus, IconUser, IconInfoCircle, IconUsers } from '@tabler/icons-react';
import type { Property, Owner, Prospect } from 'data';
import { Price } from '../../app/components';

const DEAL_TYPE_LABELS = {
  sale: 'Продажа',
  rent: 'Аренда',
};

const PROSPECT_STATUS_LABELS = {
  inquired: 'Интересовался',
  scheduled_a_showing: 'Запланирован показ',
  feedback_from_the_showing: 'Отзыв после показа',
  request_to_the_owner: 'Запрос владельцу',
  bargaining: 'Торги',
  contract_discussion: 'Обсуждение договора',
  document_preparation: 'Подготовка документов',
  scheduled_signing: 'Запланировано подписание',
  deal: 'Сделка',
  feedback_from_the_deal: 'Отзыв после сделки',
};

export const PropertyPage: FC = () => {
  const navigate = useNavigate();
  const { property, owner, prospects } = useLoaderData<{
    property: Property;
    owner?: Owner;
    prospects: Prospect[];
  }>();

  return (
    <Container
      size='sm'
      py='md'
    >
      <Stack gap='md'>
        {/* Header with back button */}
        <Group>
          <ActionIcon
            variant='subtle'
            onClick={() => navigate(-1)}
          >
            <IconChevronLeft size={20} />
          </ActionIcon>
          <Text
            size='lg'
            fw={500}
          >
            Назад
          </Text>
        </Group>

        {/* Property Header Card */}
        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
        >
          <Stack
            align='center'
            gap='md'
          >
            <Avatar
              size={80}
              radius='md'
              color='blue'
            >
              {property.name.charAt(0)}
            </Avatar>
            <Stack
              align='center'
              gap='xs'
            >
              <Title
                order={2}
                ta='center'
              >
                {property.name}
              </Title>
              <Group gap='xs'>
                <Badge
                  color='blue'
                  variant='light'
                >
                  {DEAL_TYPE_LABELS[property.dealType]}
                </Badge>
                {property.price && (
                  <Text
                    size='sm'
                    c='dimmed'
                  >
                    <Price
                      amount={property.price.amount}
                      currency={property.price.currency}
                    />
                  </Text>
                )}
              </Group>
            </Stack>
          </Stack>
        </Card>

        {/* Property Info */}
        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
        >
          <Stack gap='md'>
            <Group gap='xs'>
              <ThemeIcon
                color='blue'
                variant='light'
                size='sm'
              >
                <IconInfoCircle size={16} />
              </ThemeIcon>
              <Text fw={500}>Информация</Text>
            </Group>

            <Stack gap='xs'>
              {property.area && (
                <Group justify='space-between'>
                  <Text
                    size='sm'
                    c='dimmed'
                  >
                    Площадь
                  </Text>
                  <Text
                    size='sm'
                    fw={500}
                  >
                    {property.area / 100} м²
                  </Text>
                </Group>
              )}
              {property.floor && (
                <Group justify='space-between'>
                  <Text
                    size='sm'
                    c='dimmed'
                  >
                    Этаж
                  </Text>
                  <Text
                    size='sm'
                    fw={500}
                  >
                    {property.floor.number} из {property.floor.total}
                  </Text>
                </Group>
              )}
            </Stack>
          </Stack>
        </Card>

        {/* Owner Info */}
        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
        >
          <Stack gap='md'>
            <Group gap='xs'>
              <ThemeIcon
                color='green'
                variant='light'
                size='sm'
              >
                <IconUser size={16} />
              </ThemeIcon>
              <Text fw={500}>Собственник</Text>
            </Group>

            {owner ? (
              <Paper
                p='md'
                withBorder
              >
                <Group gap='md'>
                  <Avatar
                    size='md'
                    color='green'
                  >
                    {owner.emoji}
                  </Avatar>
                  <Stack
                    gap='xs'
                    style={{ flex: 1 }}
                  >
                    <Text fw={500}>{owner.name}</Text>
                    {owner.contacts.phone && (
                      <Text
                        size='sm'
                        c='dimmed'
                      >
                        {owner.contacts.phone}
                      </Text>
                    )}
                    {owner.contacts.email && (
                      <Text
                        size='sm'
                        c='dimmed'
                      >
                        {owner.contacts.email}
                      </Text>
                    )}
                  </Stack>
                </Group>
              </Paper>
            ) : (
              <Button
                variant='light'
                leftSection={<IconPlus size={16} />}
                color='blue'
              >
                Добавить собственника
              </Button>
            )}
          </Stack>
        </Card>

        {/* Prospects */}
        <Card
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
        >
          <Stack gap='md'>
            <Group gap='xs'>
              <ThemeIcon
                color='orange'
                variant='light'
                size='sm'
              >
                <IconUsers size={16} />
              </ThemeIcon>
              <Text fw={500}>Клиенты</Text>
            </Group>

            {prospects.length > 0 ? (
              <Stack gap='xs'>
                {prospects.map((prospect) => (
                  <Paper
                    key={prospect.id}
                    p='md'
                    withBorder
                  >
                    <Group gap='md'>
                      <Stack
                        gap='xs'
                        style={{ flex: 1 }}
                      >
                        <Text fw={500}>{prospect.name}</Text>
                        <Badge
                          size='sm'
                          variant='light'
                          color='orange'
                        >
                          {PROSPECT_STATUS_LABELS[prospect.status]}
                        </Badge>
                        {prospect.contacts.phone && (
                          <Text
                            size='sm'
                            c='dimmed'
                          >
                            {prospect.contacts.phone}
                          </Text>
                        )}
                      </Stack>
                    </Group>
                  </Paper>
                ))}
                <Divider />
              </Stack>
            ) : null}

            <Button
              variant='light'
              leftSection={<IconPlus size={16} />}
              color='blue'
            >
              Добавить клиента
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};
