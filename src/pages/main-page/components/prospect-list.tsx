import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Group,
  Progress,
  RingProgress,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { prospectDataProvider, type Prospect, type ProspectStatus } from '../../../data';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { IconAt, IconBrandTelegram, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react';

const PROSPECT_STATUS_LABELS: Record<ProspectStatus, ReactNode> = {
  inquired: <Badge color='blue'>Интересовался</Badge>,
  scheduled_a_showing: <Badge color='blue'>Назначен показ</Badge>,
  feedback_from_the_showing: <Badge color='yellow'>Фидбек с показа</Badge>,
  request_to_the_owner: <Badge color='green'>Запрос собственнику</Badge>,
  bargaining: <Badge color='yellow'>Торг</Badge>,
  contract_discussion: <Badge color='yellow'>Обсуждение договора</Badge>,
  document_preparation: <Badge color='blue'>Подготовка документов</Badge>,
  scheduled_signing: <Badge color='yellow'>Назначено подписание</Badge>,
  deal: <Badge color='blue'>Сделка</Badge>,
  feedback_from_the_deal: <Badge color='green'>Фидбек со сделки</Badge>,
};

const CONTACT_ICONS: Record<keyof Prospect['contacts'], ReactNode> = {
  phone: (
    <IconPhone
      color='grey'
      size={16}
    />
  ),
  email: (
    <IconAt
      color='grey'
      size={16}
    />
  ),
  telegram: (
    <IconBrandTelegram
      color='grey'
      size={16}
    />
  ),
  whatsapp: (
    <IconBrandWhatsapp
      color='grey'
      size={16}
    />
  ),
};

const CONTACT_LINKS: Record<keyof Prospect['contacts'], string> = {
  phone: 'tel:',
  email: 'mailto:',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
};

type ProspectListProps = {
  prospectIds: string[];
};

export const ProspectList: FC<ProspectListProps> = (props) => {
  const theme = useMantineTheme();
  const { prospectIds } = props;

  const [prospects, setProspects] = useState<Prospect[]>([]);

  useEffect(() => {
    Promise.all(prospectIds.map((prospectId) => prospectDataProvider.getProspectById(prospectId))).then(setProspects);
  }, [prospectIds]);

  const cards = prospects.map((item) => (
    <Card
      withBorder
      padding='md'
      radius='md'
      pos='relative'
      style={{
        overflow: 'visible',
      }}
    >
      <Box
        pos='absolute'
        top={0}
        right={0}
        style={{
          zIndex: 100,
          transform: 'translate(8px, -8px)',
        }}
      >
        {PROSPECT_STATUS_LABELS[item.status]}
      </Box>
      <Stack gap='xs'>
        <Group
          gap='xs'
          align='center'
          wrap='nowrap'
        >
          <Avatar
            radius={'xl'}
            color='initials'
          >
            {item.emoji}
          </Avatar>
          <Text
            fz='lg'
            fw={500}
          >
            {item.name}
          </Text>
        </Group>
        <Group
          gap='xs'
          align='start'
          justify='space-between'
          wrap='nowrap'
        >
          <Stack
            gap='2px'
            ml={12}
          >
            {Object.entries(item.contacts).map(([key, value]) => (
              <a
                href={`${CONTACT_LINKS[key as keyof Prospect['contacts']]}${value}`}
                key={key}
                target='_blank'
              >
                <Group
                  gap='sm'
                  wrap='nowrap'
                >
                  {CONTACT_ICONS[key as keyof Prospect['contacts']]}
                  <Text
                    fz='xs'
                    c='dimmed'
                  >
                    {value}
                  </Text>
                </Group>
              </a>
            ))}
          </Stack>
          <RingProgress
            roundCaps
            thickness={6}
            size={100}
            sections={[{ value: 15, color: theme.primaryColor }]}
            label={
              <Center>
                <Text
                  fz='xl'
                  fw={500}
                >
                  {15}%
                </Text>
              </Center>
            }
          />
        </Group>
        <Button
          size='xs'
          variant='light'
        >
          Заметка
        </Button>
      </Stack>
    </Card>
  ));

  return <Stack gap='sm'>{cards}</Stack>;
};
