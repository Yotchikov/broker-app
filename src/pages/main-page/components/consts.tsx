import { IconPhone, IconAt, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import type { ProspectStatus, Prospect, Property } from '../../../data';
import { Group, type DrawerProps, Text } from '@mantine/core';
import IconBrandCian from 'public/icons/companies/cian.svg?react';
import IconBrandAvito from 'public/icons/companies/avito.svg?react';
import IconBrandYandex from 'public/icons/companies/yandex.svg?react';
import IconBrandDomclick from 'public/icons/companies/domclick.svg?react';

export const PROSPECT_STATUS_TITLES: Record<ProspectStatus, string> = {
  inquired: 'Интересовался',
  scheduled_a_showing: 'Назначен показ',
  feedback_from_the_showing: 'Фидбек с показа',
  request_to_the_owner: 'Запрос собственнику',
  bargaining: 'Торг',
  contract_discussion: 'Обсуждение договора',
  document_preparation: 'Подготовка документов',
  scheduled_signing: 'Назначено подписание',
  deal: 'Сделка',
  feedback_from_the_deal: 'Фидбек со сделки',
  canceled: 'Отказ',
};

export const PROSPECT_STATUS_ORDER: ProspectStatus[] = [
  'inquired',
  'scheduled_a_showing',
  'feedback_from_the_showing',
  'request_to_the_owner',
  'bargaining',
  'contract_discussion',
  'document_preparation',
  'scheduled_signing',
  'deal',
  'feedback_from_the_deal',
  'canceled',
];

export const LINK_LABELS: Record<keyof Property['links'], ReactNode> = {
  cian: (
    <Group
      gap='xs'
      wrap='nowrap'
      align='center'
    >
      <IconBrandCian
        width={20}
        height={20}
        display='block'
      />
      <Text size='md'>Циан</Text>
    </Group>
  ),
  avito: (
    <Group
      gap='xs'
      wrap='nowrap'
      align='center'
    >
      <IconBrandAvito
        width={20}
        height={20}
      />
      <Text size='md'>Авито</Text>
    </Group>
  ),
  yandex: (
    <Group
      gap='xs'
      wrap='nowrap'
      align='center'
    >
      <IconBrandYandex
        width={20}
        height={20}
      />
      <Text size='md'>Яндекс</Text>
    </Group>
  ),
  domclick: (
    <Group
      gap='xs'
      wrap='nowrap'
      align='center'
    >
      <IconBrandDomclick
        width={20}
        height={20}
      />
      <Text size='md'>Домклик</Text>
    </Group>
  ),
};
export const CONTACT_LABELS: Record<keyof Prospect['contacts'], ReactNode> = {
  phone: (
    <Group
      gap='xs'
      c='dimmed'
      wrap='nowrap'
      align='center'
    >
      <IconPhone
        stroke={1.8}
        color='var(--mantine-color-dimmed)'
        size={20}
      />
      <Text size='md'>Телефон</Text>
    </Group>
  ),
  email: (
    <Group
      gap='xs'
      c='dimmed'
      wrap='nowrap'
      align='center'
    >
      <IconAt
        stroke={1.8}
        color='var(--mantine-color-dimmed)'
        size={20}
      />
      <Text size='md'>Email</Text>
    </Group>
  ),
  telegram: (
    <Group
      gap='xs'
      c='dimmed'
      wrap='nowrap'
      align='center'
    >
      <IconBrandTelegram
        stroke={1.8}
        color='var(--mantine-color-dimmed)'
        size={20}
      />
      <Text size='md'>Telegram</Text>
    </Group>
  ),
  whatsapp: (
    <Group
      gap='xs'
      c='dimmed'
      wrap='nowrap'
      align='center'
    >
      <IconBrandWhatsapp
        stroke={1.8}
        color='var(--mantine-color-dimmed)'
        size={20}
      />
      <Text size='md'>WhatsApp</Text>
    </Group>
  ),
};

export const CONTACT_LINKS: Record<keyof Prospect['contacts'], string> = {
  phone: 'tel:',
  email: 'mailto:',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
};

export const COMMON_DRAWER_PROPS: Partial<DrawerProps> = {
  position: 'bottom',
  styles: { content: { height: 'auto', marginBottom: 16 } },
  offset: 12,
  radius: 'xl',
  closeButtonProps: { size: 'lg' },
};
