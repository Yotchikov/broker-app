import { IconPhone, IconAt, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import type { ProspectStatus, Prospect } from '../../../data';
import type { DrawerProps } from '@mantine/core';

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
];

export const CONTACT_ICONS: Record<keyof Prospect['contacts'], ReactNode> = {
  phone: (
    <IconPhone
      stroke={1.8}
      color='var(--mantine-color-dimmed)'
      size={20}
    />
  ),
  email: (
    <IconAt
      stroke={1.8}
      color='var(--mantine-color-dimmed)'
      size={20}
    />
  ),
  telegram: (
    <IconBrandTelegram
      stroke={1.8}
      color='var(--mantine-color-dimmed)'
      size={20}
    />
  ),
  whatsapp: (
    <IconBrandWhatsapp
      stroke={1.8}
      color='var(--mantine-color-dimmed)'
      size={20}
    />
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
  styles: { content: { height: 'auto' } },
  offset: 8,
  radius: 'md',
  closeButtonProps: { size: 'lg' },
};
